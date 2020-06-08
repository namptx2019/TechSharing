<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group(['prefix' => 'user'], function () {
//    Route::get('popular', 'SeriesController@getSeriesByLocale')->name('pubApi.series.popular');
    Route::post('auth', 'UsersController@auth')->name('api.user.login');
    Route::post('register', 'UsersController@store')->name('api.user.register');
    Route::middleware('auth:api')->get('/me','UsersController@me')->name('api.currentuser.info');
});

/**
 * Group routes is protected by passport
 */

Route::group(['middleware' => ['auth:api']], function () {
  /**
   * Routes for Role of users
   */
  Route::group(['prefix' => 'role'], function () {
    Route::get('/', 'RolesController@index')->name('api_role_list');
    Route::get('{id}', 'RolesController@show')->where('id', '[0-9]+')->name('api_role_show');
    Route::post('create', 'RolesController@store')->name('api_role_create');
    Route::post('edit/{id}', 'RolesController@update')->where('id', '[0-9]+')->name('api_role_update');
    Route::delete('delete/{id}', 'RolesController@destroy')->name('api_role_delete');

    Route::post('permission', 'RolesController@modifyPermission')->name('api_role_permission');
  });

  /**
   * Routes for Users
   */
  Route::group(['prefix' => 'user'], function () {
    Route::get('/', 'UsersController@index')->name('api_user_list');
    Route::get('delete_ava/{uuid}', 'UsersController@deleteAvatar')->name('api_user_delete_ava');
    Route::get('search/{offset}', 'UsersController@search')->name('api_user_search');
    Route::get('{uuid}', 'UsersController@show')->name('api_user_show');
    Route::post('create', 'UsersController@store')->name('api_user_create');
    Route::post('edit/{uuid}', 'UsersController@update')->name('api_user_update');
    Route::delete('delete/{uuid}', 'UsersController@destroy')->name('api_user_delete');
  });

  /**
   * Routes for categories
   * CRUD
   */
  Route::group(['prefix' => 'category'], function () {
    Route::get('/', 'CategoriesController@index')->name('api_category_list');
    Route::get('hierarchy', 'CategoriesController@hierarchy')->name('api_category_hierarchy');
    Route::get('/{id}', 'CategoriesController@show')->where('id', '[0-9]+')->name('api_category_show');
    Route::post('/create', 'CategoriesController@store')->name('api_category_create');
    Route::post('/edit/{id}', 'CategoriesController@update')->where('id', '[0-9]+')->name('api_category_update');
    Route::delete('/delete/{id}', 'CategoriesController@destroy')->where('id', '[0-9]+')->name('api_category_delete');
  });

  /**
   * Routes for Posts
   * CRUD
   */
  Route::group(['prefix' => 'post'], function () {
    Route::get('/', 'PostsController@index')->name('api_post_list');
    Route::get('/{id}', 'PostsController@show')->where('id', '[0-9]+')->name('api_post_show');
    Route::post('create', 'PostsController@store')->name('api_post_create');
    Route::post('edit/{id}', 'PostsController@update')->where('id', '[0-9]+')->name('api_post_create');
    Route::delete('delete/{id}', 'PostsController@destroy')->where('id', '[0-9]+')->name('api_post_delete');
    Route::post('/{postSlug}/comment', 'CommentsController@store')->name('pubApi.post.comment');
    Route::get('/{id}/series', 'PostsController@getSeries')->where('id', '[0-9]+')->name('api_post_getSeries');
  });

  /**
   * Routes for series and Series - Posts relations
   */
  Route::group(['prefix' => 'series'], function () {
    Route::get('/', 'SeriesController@getSeriesAllLanguage')->name('api_series_list');
    Route::get('/{id}', 'SeriesController@show')->where('id', '[0-9]+')->name('api_series_show');
    Route::post('create', 'SeriesController@store')->name('api_series_create');
    Route::post('edit/{id}', 'SeriesController@update')->where('id', '[0-9]+')->name('api_series_edit');
    Route::delete('delete/{id}', 'SeriesController@destroy')->where('id', '[0-9]+')->name('api_series_delete');
    Route::get('/{id}/posts', 'SeriesController@getPosts')->where('id', '[0-9]+')->name('api_series_getPost');
    Route::post('/add-post', 'SeriesPostRelationsController@store')->name('api_series_addpost');
    Route::post('/remove-post', 'SeriesPostRelationsController@destroy')->name('api_series_remove');
  });

  /**
   * Routes for comments
   * CRUD
   */
  Route::group(['prefix' => 'comment'], function () {
    Route::get('/', 'CommentsController@index')->name('api_comment_list');
    Route::get('/{id}', 'CommentsController@show')->where('id', '[0-9]+')->name('api_comment_show');
    Route::post('create', 'CommentsController@store')->name('api_comment_create');
    Route::post('edit/{id}', 'CommentsController@update')->where('id', '[0-9]+')->name('api_comment_edit');
    Route::delete('delete/{id}', 'CommentsController@destroy')->where('id', '[0-9]+')->name('api_comment_delete');
  });

  /**
   * Ranks
   */
  Route::group(['prefix' => 'rank'], function () {
    Route::get('/', 'RanksController@index')->name('api_rank_list');
    Route::get('{id}', 'RanksController@show')->where('id', '[0-9]+')->name('api_rank_show');
    Route::post('create', 'RanksController@store')->name('api_rank_create');
    Route::post('edit/{id}', 'RanksController@update')->where('id', '[0-9]+')->name('api_rank_edit');
    Route::delete('delete/{id}', 'RanksController@destroy')->where('id', '[0-9]+')->name('api_rank_delete');
  });

  /**
   * Homepage slider
   */
  Route::group(['prefix' => 'slider'], function () {
    Route::get('/', 'HomepageSlidersController@index')->name('api_slider_list');
    Route::get('/all', 'HomepageSlidersController@getAll')->name('api_slider_all');
    Route::get('/{id}', 'HomepageSlidersController@show')->where('id', '[0-9]+')->name('api_slider_show');
    Route::post('create', 'HomepageSlidersController@store')->name('api_slider_create');
    Route::post('update/{id}', 'HomepageSlidersController@update')->where('id', '[0-9]+')->name('api_slider_update');
    Route::delete('delete/{id}', 'HomepageSlidersController@destroy')->where('id', '[0-9]+')->name('api_slider_delete');
  });
});


/**
 * Public API
 */
Route::group(['prefix' => 'categories'], function () {
  Route::get('hierarchy', 'CategoriesController@hierarchy')->name('api.categories.hiararchy');
});
