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
    <div class="columns">
        <div class="column">
            <h4 class="title is-4">Mes articles</h4>
        </div>
    </div>
    <div class="columns is-multiline">
        @foreach($articles as $article)
        <div class="column is-12">
            <div class="box">
                <p>
                    <a class="title is-6 article-link" href="/articles/{{$article->id}}">{{$article->title}}</a> de <i>{{$article->author->name}}</i>
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
