<?php

namespace App\Http\Controllers;

use App\Article;
use App\Http\Requests\DestroyParagraphRequest;
use App\Http\Requests\OrderParagraphRequest;
use App\Http\Requests\StoreParagraphRequest;
use App\Http\Requests\UpdateParagraphRequest;
use App\Paragraph;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ParagraphController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(StoreParagraphRequest $request, $article_id) {
        $newParagraph = null;
        // Pass a reference to get the new paragraph id outside of the database transaction closure
        DB::transaction(function() use(&$newParagraph, $article_id) {
            // Get the position of the new paragraph
            $currentArticleParagraphs = Paragraph::where('article_id', $article_id)->get();
            $newLastPosition = $currentArticleParagraphs->max('order') + 1;

            // Create the new paragraph
            $newParagraph = Paragraph::create([
                'content' => request('content'),
                'article_id' => $article_id,
                'order' => $newLastPosition
            ]);

            // Touch the article to update its "last updated" date
            Article::where('id', $article_id)->first()->touch();
        });

        // Send the new paragraph's id
        return response()->json([
            'paragraph_id' => $newParagraph->id
        ]);
    }

    public function update (UpdateParagraphRequest $request, $article_id, $paragraph_id) {
        // Receive a paragraph id with the new content
        Paragraph::where('id', $paragraph_id)->update(['content' => request('content')]);
    }

    public function order (OrderParagraphRequest $request, $article_id) {
        // Receive the complete list of paragraphs ids with their new position
        DB::transaction(function() {
            foreach (request('paragraphs') as $paragraph) {
                Paragraph::find($paragraph["id"])->update(['order' => $paragraph["order"]]);
            }
        });
    }

    public function destroy (DestroyParagraphRequest $request, $article_id, $paragraph_id) {
        // Receive the id of the paragraph to delete
        DB::transaction(function() use($article_id, $paragraph_id) {
            Paragraph::destroy($paragraph_id);
            $paragraphs = Paragraph::where('article_id', $article_id)->get();

            // Reorder paragraphs
            $order = 1;
            foreach ($paragraphs as $paragraph) {
                $paragraph->update(['order' => $order]);
                $order++;
            }
        });

    }
}
