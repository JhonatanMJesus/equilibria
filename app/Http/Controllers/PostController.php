<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'video' => 'required|file|mimes:mp4,mov,avi,wmv,mkv',
            'title' => 'nullable|string|max:255',
        ]);

        $user = $request->user();

        $videoPath = $request->file('video')->store('videos', 'public');

        $post = Post::create([
            'usuario_id' => $user->id,
            'title' => $request->input('title'),
            'video_path' => $videoPath,
        ]);

        return response()->json([
            'ok' => true,
            'post' => $post
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return response()->json([
            'id' => $post->id,
            'user' => $post->user->name,
            'title' => $post->title,
            'description' => $post->description,
            'video_url' => asset('storage/' . $post->video_path),
            'created_at' => $post->created_at,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'video' => 'nullable|file|mimes:mp4,mov,avi,wmv|max:51200', // vídeo opcional
        ]);

        // Verifique se o usuário autenticado é o dono do post
        if ($request->user()->id !== $post->user_id) {
            return response()->json(['ok' => false, 'msg' => 'Acesso negado.'], 403);
        }

        // Se novo vídeo foi enviado, apaga o antigo e salva o novo
        if ($request->hasFile('video')) {
            // remove o vídeo antigo (opcional, se quiser limpar o storage)
            Storage::disk('public')->delete($post->video_path);

            $videoPath = $request->file('video')->store('videos', 'public');
            $post->video_path = $videoPath;
        }

        // Atualiza os demais campos, se forem enviados
        if ($request->has('title')) {
            $post->title = $request->input('title');
        }

        if ($request->has('description')) {
            $post->description = $request->input('description');
        }

        $post->save();

        return response()->json([
            'ok' => true,
            'post' => $post
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Post $post)
    {
        // Verifica se o usuário autenticado é o dono do post
        if ($request->user()->id !== $post->user_id) {
            return response()->json(['ok' => false, 'msg' => 'Acesso negado.'], 403);
        }

        // Remove o vídeo do storage (opcional, mas recomendado)
        Storage::disk('public')->delete($post->video_path);

        // Deleta o post do banco
        $post->delete();

        return response()->json(['ok' => true, 'msg' => 'Post deletado com sucesso.']);
    }
}
