<?php

use Illuminate\Support\Facades\Auth;
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

Auth::routes();
Route::get('/', 'HomeController@index')->name('home');
Route::redirect('/articles', '/');
Route::get('articles/new', 'ArticleController@create')->name('article.create');
Route::post('articles/new', 'ArticleController@store')->name('article.store');
Route::get('articles/{id}', 'ArticleController@show')->name('article.show');
Route::get('articles/{id}/edit', 'ArticleController@edit')->name('article.edit');
Route::patch('article/{id}', 'ArticleController@update')->name('article.update');
// TODO : DELETE route