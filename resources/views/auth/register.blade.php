@extends('template')

@section('stylesheet')
    {{asset('css/register.css')}}
@endsection

@section('title')
    blogebm | {{ __('Register') }}
@endsection

@section('content')
@include('header')
<div class="container">
    <div class="columns">
        <div class="column is-8 is-offset-2">
            <div class="card">
                <div class="card-content">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="field">
                            <label for="email" class="label">{{ __('E-mail address') }}</label>

                            <div class=control">
                                <input id="email" type="email" class="input {{ $errors->has('email') ? ' is-danger' : '' }}" name="email" value="{{ old('email') }}" required>
                            </div>
                            @if ($errors->has('email'))
                                <p class="help is-danger">{{ $errors->first('email') }}</p>
                            @endif
                        </div>

                        <div class="field">
                            <label for="password" class="label">{{ __('Password') }}</label>

                            <div class=control">
                                <input id="password" type="password" class="input {{ $errors->has('password') ? ' is-danger' : '' }}" name="password" required>
                            </div>
                            @if ($errors->has('password'))
                                <p class="help is-danger">{{ $errors->first('password') }}</p>
                            @endif
                        </div>

                        <div class="field">
                            <label for="password-confirm" class="label">{{ __('Confirm password') }}</label>

                            <div class=control">
                                <input id="password-confirm" type="password" class="input" name="password_confirmation" required>
                            </div>
                        </div>

                        <div class="field">
                            <div class=control">
                                <button type="submit" class="button is-link">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
