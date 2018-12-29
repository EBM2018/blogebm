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
                <h4 class="title is-4"> Mes articles</h4>
        </div>
    </div>
    @foreach($articles as $article)
    <div class="columns">
        <div class="column">
            <a class="article-link" href="/articles/{{$article->id}}">
                <div class="box">
                    <h6 class="title is-6">{{$article->title}}</h6>
                    <p>{{$article->summary}}</p>
                </div>
            </a>
        </div>
    </div>
    @endforeach
</div>


@endsection

@push('scripts')

@endpush
