<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function register(Request $request){
        $validated = $request->validate([
            'nome' => 'required|string|max:100',
            'email' => 'required|email:rfc,dns|unique:usuarios,email',
            'senha' => 'required|min:6|confirmed'
        ]);

        $user = Usuario::create([
            'nome' => $validated['nome'],
            'email' => $validated['email'],
            'senha' => Hash::make($validated['senha'])
        ]);

        $token = $user->createToken('api-token', ['post:read', 'post:create'])->plainTextToken;

        return response()->json(['ok' => true, 'usuario' => $user, 'token' => $token]);
    }

    public function login(Request $request){
        $validated = $request->validate([
            'email' => 'required|email:rfc,dns',
            'senha' => 'required|min:6'
        ]);

        if (Auth::attempt([
            'email' => $validated['email'],
            'password' => $validated['senha']
        ])) {
            $user = Usuario::where('email', $validated['email'])->firstOrFail();
            $token = $user->createToken('api-token', ['post:read', 'post:create'])->plainTextToken;
            return response()->json(['ok' => true, 'token' => $token]);
        }

        return response()->json(['ok' => false, 'msg' => 'Credenciais inválidas']);
    }

        public function logout(Request $request){
            $token = $request->bearerToken();

            if(!$token){
                return response()->json(['Ok' => false, 'msg' => 'Token não informado.'], 400);
            }

            $access_token = PersonalAccessToken::findToken($token);

            if(!$access_token){
                return response()->json(['Ok' => false, 'msg' => 'Token inválido.'], 400);
            }

            $access_token->delete();

            return response()->json(['Ok' => true, 'msg' => 'Logout realizado com sucesso.'], 400);
    }
}
