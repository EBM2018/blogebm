@extends('template')

@section('stylesheet')
    {{asset('css/article.create.css')}}
@endsection

@section('title')
    blogebm | Nouvel article
@endsection

@section ('content')
@include('header')
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                Ready for a new article !
            </div>
        </div>
    </div>
@endsection