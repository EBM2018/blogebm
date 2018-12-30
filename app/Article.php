<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'author_id', 'summary'
    ];

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
        $articles = Article::with('author:id,name')->orderBy('updated_at', 'DESC');
        return $articles;
    }
}
