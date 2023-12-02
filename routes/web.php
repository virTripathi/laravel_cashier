<?php

use App\Http\Controllers\PlansController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware('auth')->group(function() {         
    Route::get('plan/{id}',[PlansController::class,'initiate_transaction']);
    Route::get('stripe/webhook',[PlansController::class,'handle_and_update_subscriptions']);
});


Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');

require __DIR__.'/auth.php';
