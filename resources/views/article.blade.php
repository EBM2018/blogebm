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
            <h4 class="title is-4">{{$article->title}}</h4>
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
