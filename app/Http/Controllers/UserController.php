<?php

namespace App\Http\Controllers;

class UserController extends Controller
{
    public function teste(){
        return response()->json(['ok'=>true]);
    }
}
