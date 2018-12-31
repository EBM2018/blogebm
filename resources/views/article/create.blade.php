@extends('template')

@section('stylesheet')
    {{asset('css/article.create.css')}}
@endsection

@section('title')
    blogebm | {{ __("blogebm.new_article") }}
@endsection

@section ('content')
@include('header')
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <form id="article-creation-form">
                    @csrf
                    <div class="field">
                        <label class="label" for="title">{{ __("blogebm.title") }}</label>
                        <div class="control">
                            <input id="title" name="title" class="input" placeholder=""/>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="summary">{{ __("blogebm.summary") }}</label>
                        <div class="control">
                            <textarea id="summary" name="summary" class="textarea" placeholder="{{ __("blogebm.optional_field") }}"></textarea>
                        </div>
                    </div>
                    <label class="label">{{ __("blogebm.content") }}</label>
                    <div class="field" id="content-field"></div>
                    <div class="field is-grouped">
                        <div class="control">
                            <a class="button is-primary" id="add-paragraph-button" type="submit">{{ __("blogebm.add_paragraph") }}</a>
                        </div>
                        <div class="control is-expanded">
                            <input class="input" id="new-paragraph-initial-input" placeholder="{{ __("blogebm.initial_content") }}"/>
                        </div>
                    </div>
                    <hr>
                    <div class="field">
                        <div class="control">
                            <a type="submit" class="button is-link" id="article-creation-confirmation-button">
                                {{ __('Confirm') }}
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script type="text/javascript" src="{{ asset('js/paragraphsManager.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/articleCreator.js') }}"></script>
@endpush