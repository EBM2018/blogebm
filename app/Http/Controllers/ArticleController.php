<?php

namespace App\Http\Controllers;

use App\Article;
use App\Http\Requests\StoreArticleRequest;
use App\Paragraph;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['show']]);
    }

    public function show($id)
    {
        $article = Article::with(['paragraphs', 'author'])->where('id', $id)->first();
        return view('article.show', compact('article'));

    }

    public function create()
    {
        return view('article.create');
    }

    public function store(StoreArticleRequest $request)
    {
        DB::transaction(function() {
            $newArticle = Article::create([
                'title' => request('title'),
                'summary' => request('summary'),
                'author_id' => Auth::user()->id
            ]);
            $order = 1;
            foreach (request('paragraphs') as $paragraphContent) {
                Paragraph::create([
                    'content' => $paragraphContent,
                    'article_id' => $newArticle->id,
                    'order' => $order
                ]);
                $order++;
            }
        });
    }

    public function edit($id)
    {
        $article = Article::with(['paragraphs', 'author'])->where('id', $id)->first();
        if (Auth::user()->id === $article->author->id) return view('article.edit', compact('article'));
        return abort(403); // Authorized to access the edit page of an article a user doesn't own
    }

    public function update()
    {
        // TODO: Change title / summary
    }

    public function destroy($id)
    {
        $article = Article::with('author')->where('id', $id)->first();
        if ($article === null) return abort(404);
        if (Auth::user()->id !== $article->author->id) return abort(403);
        Article::destroy($id);
    }
}
