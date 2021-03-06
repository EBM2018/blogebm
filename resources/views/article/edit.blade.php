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
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <div>
                                <p class="title">{{$article->title}}</p>
                                <p class="heading">
                                    {{ __('blogebm.article_page_summary', ['author' => $article->author->name, 'date' => $article->created_at->format('d/m/Y')]) }}
                                    @if ($article->created_at != $article->updated_at)
                                        <i>({{ __('blogebm.last_updated_on', ['date' => $article->updated_at->format('d/m/Y')]) }})</i>
                                    @endif
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <a class="button is-danger" id="article-deletion-button">
                                {{ __('Delete') }}
                            </a>
                        </div>
                        <div class="level-item">
                            <a class="button is-primary" href="{{ route('article.show', ['id' => Route::current()->parameters["id"]]) }}">{{ __('blogebm.lecture_mode') }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <form id="article-edition-form">
                    @csrf
                    <label class="label">{{ __("blogebm.content") }}</label>
                    <div class="field" id="content-field">
                        @foreach ($article->paragraphs as $paragraph)
                        <div class="field has-addons paragraph-field" draggable="true" id="paragraph-field-{{$paragraph->id}}">
                            <p class="lecture-mode-paragraph paragraph" data-type="old" data-id="{{$paragraph->id}}">{{$paragraph->content}}</p>
                        </div>
                        @endforeach
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <a class="button is-primary" id="add-paragraph-button" type="submit">{{ __("blogebm.add_paragraph") }}</a>
                        </div>
                        <div class="control is-expanded">
                            <input class="input" id="new-paragraph-initial-input" placeholder="{{ __("blogebm.initial_content") }}" onkeydown="if (event.key === 'Enter') event.preventDefault()"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script type="text/javascript" src="{{ asset('js/articleEditor.js') }}"></script>
@endpush