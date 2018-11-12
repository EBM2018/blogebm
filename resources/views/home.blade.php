@extends('template')

@section('stylesheet')

@endsection

@section('title')
    blogebm
@endsection

@section ('content')
@include ('header')
<div class="container is-fluid">
    <div class="columns">
        <div class="column ">
                <h4 class = "title is-4"> Mes articles</h4>
        </div>
    </div>
    <div class="columns">
        <div class="column ">
            <div class="box">
                <h6 class = "title is-6"> Théorie du complot : les chatons ont envahi le monde</h6>
                <p>De plus en plus nombreux dans les familles mais aussi dans la rue, les chatons s'organisent pour dominer le monde</p>
            </div>
        </div>
    </div>
    <div class="columns">
        <div class="column ">
            <div class="box">
                <h6 class = "title is-6"> Vianney se questionne</h6>
                <p>Mais t'es où Hamza ?</p>
            </div>
        </div>
    </div>
    <div class="columns">
        <div class="column ">
            <div class="box">
                <h6 class = "title is-6"> Pikachu et Bakura sont de retour</h6>
                <p>Dans la classe EBM, les émulateurs font rage. Yu-Gi-Oh et Pokémon sont au coeur des esprits. Facebook a du souci à se faire...</p>
            </div>
        </div>
    </div>
</div>


@endsection

@push('scripts')

@endpush
