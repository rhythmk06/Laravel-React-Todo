<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Todo;
use App\User;
use JWTAuth;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $loggedUserId = JWTAuth::user()->id;

        $user = User::find($loggedUserId);
        $todos = User::find($loggedUserId)->todos;

        $todo = Todo::find(1)->users;

        $data = ['todos' => $todos, 'user' => $user, 'todo' => $todo];

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $loggedUserId = JWTAuth::user()->id;
        
        $todo = new Todo();
        $todo->name = $request->get('name');
        $todo->user_id = $loggedUserId;
        $todo->save();

        $user = JWTAuth::user()->id;
        $todos = User::find($user)->todos;
        return response()->json($todos);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {   

        $todo = Todo::find($id);
        $todo->name = $request->get('name');
        $todo->save();

        $user = JWTAuth::user()->id;
        $todos = User::find($user)->todos;
        return response()->json($todos);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $todo = Todo::find($id);
        $todo->delete();

        $user = JWTAuth::user()->id;
        $todos = User::find($user)->todos;
        return response()->json($todos);
    }
}
