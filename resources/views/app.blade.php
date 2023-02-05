<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{ url('storage/favicon.png') }}" />
    <title>{{ config('app.name') }}</title>
    {{-- @vite('resources/frontend/main.tsx')
    @viteReactRefresh
    @inertiaHead
    @routes --}}
    @routes
    @include('assets')
</head>

<body>
    @inertia
    <noscript>Please enable javascript to run this application</noscript>
</body>

</html>
