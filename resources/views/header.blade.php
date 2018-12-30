<div class="container is-fluid">
    <header class="columns">
        <div class="column">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <h1 class="title">
                            <a id="header-home-link" href="/">{{ucfirst(str_shuffle('blogebm')) . " !"}}</a>
                        </h1>
                    </div>
                </div>
                <div class="level-right">
                    @guest
                    <div class="level-item">
                        <a class="button is-link is-outlined" href="{{ route('register') }}" type="submit">{{ __('Register') }}</a>
                    </div>
                    <div class="level-item">
                        <a class="button is-link" href="{{ route('login') }}" type="submit">{{ __('Login') }}</a>
                    </div>
                    @else
                    <div class="level-item">
                        Connecté comme {{Auth::user()->name}}
                    </div>
                    <div class="level-item">
                        <a class="button is-danger is-outlined" type="submit" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            {{ __('Logout') }}
                        </a>
                    </div>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">@csrf</form>
                    @endguest
                </div>
            </div>
        </div>
    </header>
    <div class="columns">
        <div class="column is-12 hr-header-column">
            <hr class="is-marginless">
        </div>
    </div>
</div>