@extends('template')

@section('stylesheet')
    {{asset('css/article.create.css')}}
@endsection

@section('title')
    blogebm | {{ __('blogebm.article_edition') }}
@endsection

@section ('content')
@include('header')
    <div class="container is-fluid">
        <div class="columns">
            <div class="column">
                <form id="article-edition-form">
                    @csrf
                    <div class="field">
                        <label class="label" for="title">{{ __("blogebm.title") }}</label>
                        <div class="control">
                            <input id="title" name="title" class="input" value="{{ $article->title }}" placeholder="" disabled/>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label" for="summary">{{ __("blogebm.summary") }}</label>
                        <div class="control">
                            <textarea id="summary" name="summary" class="textarea" placeholder="{{ __("blogebm.optional_field") }}" disabled>{{$article->summary}}</textarea>
                        </div>
                    </div>
                    <label class="label">{{ __("blogebm.content") }}</label>
                    <div class="field is-grouped">
                        <div class="control">
                            <a class="button is-primary" id="add-paragraph-button" type="submit">{{ __("blogebm.add_paragraph") }}</a>
                        </div>
                        <div class="control is-expanded">
                            <input class="input" id="new-paragraph-initial-input" placeholder="{{ __("blogebm.initial_content") }}"/>
                        </div>
                    </div>
                    <div class="field" id="content-field">
                        @foreach ($article->paragraphs as $paragraph)
                        <div class="field has-addons paragraph-field" id="paragraph-field-{{$paragraph->id}}">
                            <div class="control is-expanded">
                                <textarea class="textarea paragraph" placeholder="..." data-type="old" data-id="{{$paragraph->id}}">{{$paragraph->content}}</textarea>
                            </div>
                            <div class="control" style="display:none">
                                <a class="delete close-paragraph-button" data-paragraph="{{$paragraph->id}}"></a>
                            </div>
                        </div>
                        @endforeach
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
    <script type="text/javascript" src="{{ asset('js/articleEditor.js') }}"></script>
@endpush