<?php

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

//Route::get('/', function () {
//    return view('welcome');
//});

Route::get('/', 'UsersController@index')->name('student_index');
Route::post('/login', 'UsersController@auth')->name('user_login');
Route::middleware('auth:api')->get('/me', function () {
    dd(Auth::user());
});
