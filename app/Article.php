<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    /**
     * Get the article's paragraphs.
     */
    public function paragraphs() {
        return $this->hasMany('App\Paragraph')->orderBy('order');
    }

    /**
     * Get the article's author.
     */
    public function author() {
        return $this->belongsTo('App\User', 'author_id');
    }

    public static function allSummarized() {
        $articles = Article::with('author:id,name')->select('id', 'title', 'summary', 'author_id');
        return $articles;
    }
}
