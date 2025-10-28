<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function index()
    {
        $todoes = Todo::where('user_id', '=', Auth::id())->get();

        return TodoResource::collection($todoes);
    }

    public function store(TodoRequest $request)
    {
        $validated = $request->validated();

        $newTodo = Todo::create([
            'body' => $validated['body'],
            'user_id' => Auth::id(), 
        ]);

        return new TodoResource($newTodo);
    }

    public function destroy(string $id)
    {
        Todo::findOrFail($id)->delete();

        return response()->json(['status' => '200', 'message' => 'OK']);
    }
}
