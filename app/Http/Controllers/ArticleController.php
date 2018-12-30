<?php

namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index($id)
    {
        $article = Article::with(['paragraphs', 'author'])->where('id', $id)->first();
        return view('article', compact('article'));
    }
}
