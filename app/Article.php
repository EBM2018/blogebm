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

    public static function allSummarized() {
        $articles = Article::select('id', 'title', 'summary');
        return $articles;
    }
}
