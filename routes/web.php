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
Route::redirect('articles', '/');
Route::get('articles/create', 'ArticleController@create')->name('article.create');
Route::post('articles', 'ArticleController@store')->name('article.store');
Route::get('articles/{id}', 'ArticleController@show')->name('article.show');
Route::get('articles/{id}/edit', 'ArticleController@edit')->name('article.edit');
Route::patch('articles/{id}', 'ArticleController@update')->name('article.update');
Route::delete('articles/{id}', 'ArticleController@destroy')->name('article.destroy');
Route::post('articles/{article_id}/paragraphs', 'ParagraphController@store')->name('paragraph.store');
Route::patch('articles/{article_id}/paragraphs/{paragraph_id}', 'ParagraphController@update')->name('paragraph.patch');
Route::patch('articles/{article_id}/paragraphs', 'ParagraphController@order')->name('paragraph.order');
Route::delete('articles/{article_id}/paragraphs/{id}', 'ParagraphController@destroy')->name('paragraph.destroy');