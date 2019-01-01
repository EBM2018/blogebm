<?php

namespace App\Http\Requests;

use App\Article;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;

class EditArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $article = Article::find($this->route('id'));
        return $article && Auth::user()->id === $article->author_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => 'required|integer|exists:articles,id',
        ];
    }


    public function all($keys = null)
    {
        $data = parent::all($keys);
        $data['id'] = $this->route('id');
        return $data;
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [];
        // TODO : Custom validation messages
        //return Lang::get('validation/storeArticle');
    }
}
