<?php

use App\Mail\ResetPasswordNotification;
// use Illuminate\Routing\Route;

Route::post('/register', 'UsersController@store')->name('pubApi.register');
Route::get('timezone', 'TimeZonesController@index')->name('pubApi.timezone.list');
Route::get('settings', 'SettingsController@visibility')->name('pubApi.settings.list');

Route::group(['prefix' => 'posts'], function(){
    Route::get('/', 'PostsController@index')->name('pubApi.posts.paginate');
    Route::get('/{postSlug}', 'PostsController@getDetailsSlug')->name('pubApi.post.getSlug');
    Route::get('/{postSlug}/comment', 'CommentsController@getComment')->name('pubApi.post.getComment');
});

Route::group(['prefix' => 'series'], function () {
    Route::get('popular', 'SeriesController@getSeriesByLocale')->name('pubApi.series.popular');
    Route::get('/{seriesSlug}', 'SeriesController@getDetailsSlug')->name('pubApi.series.getSlug');
});

Route::group(['prefix' => 'categories'], function () {
    Route::get('hierarchy', 'CategoriesController@hierarchy')->name('pubApi.categories.hiararchy');
    Route::get('/', 'CategoriesController@index')->name('pubApi.categories.list');
    Route::get('/get/{cateSlug}', 'CategoriesController@getDetailsSlug')->name('pubApi.categories.getSlug');
    Route::get('header', 'CategoriesController@headerHierarchy')->name('pubApi.categories.header');
    Route::get('popular', 'CategoriesController@popularList')->name('pubApi.categories.popular');
});


Route::group(['prefix' => 'homepage-slider'], function () {
    Route::get('/', 'HomepageSlidersController@index')->name('pubApi.slider.list');
});


// Protected Routes
Route::group(['middleware' => ['auth:api']], function () {
    Route::group(['prefix' => 'user'], function () {
        Route::get('me', 'UsersController@me')->name('pubApi_user_me');
        Route::get('{uuid}', 'UsersController@getUserByUuid')->name('pubApi_user_show');
    });
});

Route::get('leaderboard', 'UsersController@leaderboard')->name('pubApi.leaderboard');
