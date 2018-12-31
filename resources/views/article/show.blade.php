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
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <div>
                            <p class="title">{{$article->title}}</p>
                            <p class="heading">
                                {{ __('blogebm.article_page_summary', ['author' => $article->author->name, 'date' => $article->created_at->format('d/m/Y')]) }}
                                @if ($article->created_at != $article->updated_at)
                                <i>({{ __('blogebm.last_updated_on', ['date' => $article->updated_at->format('d/m/Y')]) }})</i>
                                @endif
                            </p>
                        </div>
                    </div>
                </div>
                <div class="level-right">
                    @auth
                        @if(Auth::user()->id === $article->author->id)
                        <a class="button is-primary" href="{{ route('article.edit', ['id' => Route::current()->parameters["id"]]) }}">{{ __('blogebm.edition_mode') }}</a>
                        @endif
                    @endauth
                </div>
            </div>
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