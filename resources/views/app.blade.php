<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
        <script>
            window.addEventListener('error', function(event) {
                document.body.innerHTML += '<div style="background:red;color:white;padding:20px;position:absolute;top:0;left:0;z-index:9999;width:100%;"><b>JS Error:</b> ' + event.message + '<br><pre>' + (event.error && event.error.stack ? event.error.stack : '') + '</pre></div>';
            });
            window.addEventListener('unhandledrejection', function(event) {
                document.body.innerHTML += '<div style="background:red;color:white;padding:20px;position:absolute;top:0;left:0;z-index:9999;width:100%;"><b>Promise Error:</b> ' + (event.reason && event.reason.message) + '<br><pre>' + (event.reason && event.reason.stack ? event.reason.stack : '') + '</pre></div>';
            });
        </script>
    </body>
</html>
