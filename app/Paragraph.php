<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paragraph extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'content', 'article_id', 'order'
    ];
}
