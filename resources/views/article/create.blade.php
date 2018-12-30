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
                <form>
                    <div class="field">
                        <label class="label" for="title">{{ __("blogebm.title") }}</label>
                        <div class="control">
                            <input id="title" name="title" class="input" placeholder=""/>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="summary">{{ __("blogebm.summary") }}</label>
                        <div class="control">
                            <textarea id="summary" name="summary" class="textarea" placeholder=""></textarea>
                        </div>
                    </div>
                    <label class="label">{{ __("blogebm.content") }}</label>
                    <a class="button is-primary" id="add-paragraph-button" type="submit">{{ __("blogebm.add_paragraph") }}</a>
                    <hr>
                    <div class="field">
                        <div class="control">
                            <a type="submit" class="button is-link">
                                {{ __('Confirm') }}
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection