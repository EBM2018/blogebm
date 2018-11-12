<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="author" content="Lenophie+MaxouLégal" />
    <link href="@yield('stylesheet')" rel="stylesheet" />
    <title>@yield('title')</title>
</head>

<body>
@yield('content')
</body>

<script type="text/javascript" src="{{ asset('js/common.js') }}"></script>
@stack('scripts')
</html>