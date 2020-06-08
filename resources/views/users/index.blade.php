<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Testing</title>
    <link rel="stylesheet" href="{{asset('sweetalert/sweetalert2.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
</head>
<body class="questions-view">

@if(session('message'))
    <section id="errors">
        <div class="container">
            <div class="alert alert-success" role="success">
                {{session('message')}}
            </div>
        </div>
    </section>
@endif
@dd($users);
@if($errors->any())
    <section id="errors">
        <div class="container">
            <div class="alert alert-danger" role="alert">
                @foreach($errors->all() as $error)
                    {{$error}}<br>
                @endforeach
            </div>
        </div>
    </section>
@endif

<div class="container">
    <div class="main-agile">
        <div class="alert-close"> </div>
        <div class="content-wthree">
            <div class="circle-w3layouts"></div>
            <h2>Login</h2>
            <form action="{{route('user_login')}}" method="post" id="formLogin" >
                @csrf
                <div class="inputs-w3ls">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <input id="email" type="text" name="email" placeholder="Email" required="">
                </div>
                <div class="inputs-w3ls">
                    <i class="fa fa-key" aria-hidden="true"></i>
                    <input id="password" type="password" name="password" placeholder="Password" required="">
                </div>
                <input type="submit" value="LOGIN" name="login">
            </form>
        </div>
    </div>
</div>

<script src="{{asset('js/jquery.min.js')}}"></script>
<script src="{{asset('js/jquery.countdown.min.js')}}"></script>
<script src="{{asset('js/bootstrap.min.js')}}"></script>
<script src="{{asset('sweetalert/sweetalert2.all.min.js')}}"></script>
<script src="{{asset('js/app.js')}}"></script>
</body>
</html>
