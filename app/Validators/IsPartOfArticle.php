<?php

namespace App\Validators;

use App\Paragraph;

class IsPartOfArticle
{
    public function validate($attribute, $value, $parameters, $validator)
    {
        $articleId = (int) array_get($validator->getData(), $parameters[0]);
        $paragraph = Paragraph::find($value);

        return $paragraph->article_id === $articleId;
    }
}