<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserProfile;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Traits\HttpResponses;
class RegisteredUserController extends Controller
{
    use HttpResponses;
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'mobile_number' => ['required','numeric','min:1000000000','max:9999999999'],
            'occupation' => ['nullable','string','min:3'],
            'city' => ['nullable','string','min:3'],
            'state' => ['nullable','string','min:3'],
            'country' => ['nullable','string','min:3'],
            'gender' => ['nullable','numeric','min:1','max:4'],
            'profile_photo' => ['nullable','file'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        $insert_array = [];
        $insert_array['full_name'] = $request->full_name;
        $insert_array['email'] = $request->email;
        $insert_array['mobile_number'] = $request->mobile_number;
        $insert_array['occupation'] = $request->occupation;
        $insert_array['city'] = $request->city;
        $insert_array['state'] = $request->state;
        $insert_array['country'] = $request->country;
        $insert_array['gender'] = $request->gender;
        if ($request->hasFile('profile_photo')) {
            try {
                $profilePhoto = $request->file('profile_photo');
                $profilePhotoPath = $profilePhoto->store('profile_photos', 'public');
                $insert_array['profile_photo'] = asset('storage/' . $profilePhotoPath);
            } catch(\Exception $e) {
                return $this->error('Unable to Upload File: '.$e->getMessage(),'Error',500);
            }
        }
        $insert_array['password'] = Hash::make($request->password);
        $user = User::create($insert_array);
        $stripeCustomer = $user->createAsStripeCustomer();

        event(new Registered($user));

        Auth::login($user);
        $userProfile = new UserProfile($user);
        return $this->success($userProfile,'OK',201);
    }

    public function user(Request $request) {
        return new UserProfile(Auth::user());
    }
}
