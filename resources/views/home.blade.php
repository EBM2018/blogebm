@extends('template')

@section('stylesheet')
    {{asset('css/home.css')}}
@endsection

@section('title')
    blogebm
@endsection

@section ('content')
@include ('header')
<div class="container is-fluid">
    @auth
    <div class="columns">
        <div class="column">
            <a class="button is-primary is-large" href="{{ route('article.create') }}" type="submit"><b>Nouvel article</b></a>
        </div>
    </div>
    @endauth
    <div class="columns">
        <div class="column">
            <h4 class="title is-4">Derniers articles</h4>
        </div>
    </div>
    <div class="columns is-multiline">
        @foreach($articles as $article)
        <div class="column is-12">
            <div class="box">
                <p>
                    <a class="title is-6 article-link" href="{{ route('article.show', ['id' => $article->id]) }}">{{$article->title}}</a>
                    par <i>{{$article->author->name}}</i>
                    le {{$article->created_at->format('d/m/Y')}}
                    @if ($article->created_at != $article->updated_at)
                    <i>(dernière mise à jour le {{$article->updated_at->format('d/m/Y')}})</i>
                    @endif
                </p>
                <p>{{$article->summary}}</p>
            </div>
        </div>
        @endforeach
    </div>
</div>


@endsection

@push('scripts')

@endpush
