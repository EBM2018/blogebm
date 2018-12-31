<?php

namespace App\Http\Controllers;

use App\Article;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
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
        return abort(401); // Authorized to access the edit page of an article a user doesn't own
    }

    public function update(UpdateArticleRequest $request)
    {
        // One of the operations is not CRUD (change order) and manipulates multiple paragraphs
        // so I went with an article PATCH instead of manipulating a paragraph resource with 3 different operations.
        switch(request('type')) {
            case "CREATE_PARAGRAPH":
                // Receive an article id with the new paragraph's content
                // Answer with the new paragraph's id

                $newParagraph = null;
                // Pass a reference to get the new paragraph id outside of the database transaction closure
                DB::transaction(function() use(&$newParagraph) {
                    // Get the position of the new paragraph
                    $currentArticleParagraphs = Paragraph::where('article_id', request('article_id'))->get();
                    $newLastPosition = $currentArticleParagraphs->max('order') + 1;

                    // Create the new paragraph
                    $newParagraph = Paragraph::create([
                        'content' => request('content'),
                        'article_id' => request('article_id'),
                        'order' => $newLastPosition
                    ]);

                    // Touch the article to update its "last updated" date
                    Article::where('id', request('article_id'))->first()->touch();
                });

                // Send the new paragraph's id
                return response()->json([
                    'paragraph_id' => $newParagraph->id
                ]);
            case "CHANGE_PARAGRAPH_CONTENT":
                // Receive a paragraph id with the new content
                DB::transaction(function() {
                    Paragraph::find(request('paragraph_id'))
                        ->update([
                            'content', request('content')
                        ]);
                });
                break;
            case "CHANGE_PARAGRAPHS_ORDER":
                // Receive the complete list of paragraphs ids with their new position
                DB::transaction(function() {
                   foreach (request('paragraphs') as $paragraph) {
                       Paragraph::find(request($paragraph->id))
                           ->update([
                               'order' => $paragraph->order
                           ]);
                   }
                });
                break;
            case "DELETE_PARAGRAPH":
                // Receive the id of the paragraph to delete
                DB::transaction(function() {
                    Paragraph::destroy(request('paragraph_id'));
                });
                break;
            default:
                // Type of the PATCH request is not part of the established enumeration
                // This is a BAD REQUEST (400)
                return abort(400);
        }
    }
}
