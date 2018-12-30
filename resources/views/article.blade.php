@extends('template')

@section('stylesheet')
    {{asset('css/article.css')}}
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
            <p class="subtitle is-4">Écrit par <i>{{$article->author->name}}</i></p>
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

@push('scripts')

@endpush
