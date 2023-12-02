<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlanResource;
use Illuminate\Http\Request;
use App\Models\Plan;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PlansController extends Controller
{
    use HttpResponses;

    public function index(Request $request): JsonResponse {
        $plans = PlanResource::collection(Plan::all());
        return $this->success($plans,'OK');
    }

    public function initiate_transaction(Request $request,$id) {
        
        $plan = Plan::find($id);
        $user_id = Auth::user()->id;

        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        try {
            $session = \Stripe\Checkout\Session::create([
                'line_items'  => [
                    [
                        'price' => $plan->stripe_key,
                        'quantity'   => 1,
                    ],
                ],
                'mode'        => 'subscription',
                'success_url' => env('FRONTEND_URL').'/my-profile'.'/'.$user_id,
                'cancel_url'  => env('FRONTEND_URL').'/dashboard',
            ]);
        } catch(\Exception $e) {
            return $this->error([],'Payment Failed!!',503);
        }
       

        return redirect()->away($session->url);
    }

    public function create_subscription(Request $request)
    {
        $plan = Plan::find($request->plan);
   
        $subscription = $request->user()->newSubscription($request->plan, $plan->stripe_plan)
                        ->create($request->token);
   
        return view("subscription_success");
    }

    public function handle_and_update_subscriptions(Request $request) {

        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sig_header, $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            return response('Invalid payload', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return response('Invalid signature', 400);
        } 
        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $user = User::where('stripe_session_id', $session->id)->first();
                break;

            default:
                return response('Unexpected event type', 400);
        }

        return response('Webhook Handled', 200);
    }
}
