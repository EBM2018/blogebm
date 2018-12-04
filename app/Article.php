<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    public static function allSummarized() {
        $articles = Article::select('id', 'title', 'summary');
        return $articles;
    }
}
