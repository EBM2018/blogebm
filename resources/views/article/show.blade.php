@extends('template')

@section('stylesheet')
    {{asset('css/article.show.css')}}
@endsection

@section('title')
    blogebm | {{$article->title}}
@endsection

@section ('content')
@include ('header')
<div class="container is-fluid">
    <div class="columns">
        <div class="column">
            <p class="title is-4">{{$article->title}}</p>
            <p class="subtitle is-6">
                {{ __('blogebm.article_page_summary', ['author' => $article->author->name, 'date' => $article->created_at->format('d/m/Y')]) }}
                @if ($article->created_at != $article->updated_at)
                <i>({{ __('blogebm.last_updated_on', ['date' => $article->updated_at->format('d/m/Y')]) }})</i>
                @endif
            </p>
        </div>
    </div>
    <div class="columns">
        <div class="column">
            @if($article->paragraphs->isEmpty())
                <p><i>Pas de contenu</i></p>
            @else
                @foreach($article->paragraphs as $paragraph)
                    <p>{{$paragraph->content}}</p>
                @endforeach
            @endif
        </div>
    </div>
</div>


@endsection