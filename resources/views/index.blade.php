<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Stripe Project</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>

{!! file_get_contents(public_path('frontend/index.html')) !!}
<link rel="stylesheet" href="{{asset('frontend/styles.eaf8c082a157899e.css')}}">

<app-root></app-root>


<script src="{{ asset('frontend/runtime.89bfad0fe920d2c9.js') }}"></script>
<script src="{{ asset('frontend/polyfills.f42e8324c5c7cbb0.js') }}"></script>
<script src="{{ asset('frontend/main.e9f595204c5d6829.js') }}"></script>    
</html>