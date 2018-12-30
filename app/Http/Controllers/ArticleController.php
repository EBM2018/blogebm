<?php

namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function show($id)
    {
        $article = Article::with(['paragraphs', 'author'])->where('id', $id)->first();
        return view('article.show', compact('article'));

    }

    public function create()
    {
        return view('article.create');
    }
}
