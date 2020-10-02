<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller {

	public function login(Request $request)
	{
		$credentials = $request->only('email', 'password');

		try {
			if (! $token = JWTAuth::attempt($credentials)) {
				return response()->json(['status' => false, 'error' => 'invalid_credentials'], 400);
			}
		} catch (JWTException $e) {
			return response()->json(['status' => false, 'error' => 'could_not_create_token'], 500);
		}

		return response()->json(['status' => true, 'token' => $token, 'user' => JWTAuth::user()->id]);
	}

	public function register(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:6|confirmed',
		]);

		if($validator->fails()){
				return response()->json($validator->errors()->toJson(), 400);
		}

		$user = User::create([
			'name' => $request->get('name'),
			'email' => $request->get('email'),
			'password' => Hash::make($request->get('password')),
		]);

		$token = JWTAuth::fromUser($user);

		return response()->json(compact('user','token'),201);
	}

	public function getAuthenticatedUser()
	{
		try {
			if (! $user = JWTAuth::parseToken()->authenticate()) {
				return response()->json(['status' => false, 'message' => 'user_not_found'], 404);
			}

		} catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
				return response()->json(['status' => false, 'message' => 'token_expired'], $e->getStatusCode());

		} catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
				return response()->json(['status' => false, 'message' => 'token_invalid'], $e->getStatusCode());

		} catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
				return response()->json(['status' => false, 'message' => 'token_absent'], $e->getStatusCode());

		}

		return response()->json(['status' => true, 'user' => $user]);
	}

	public function logout(Request $request)
	{
		$this->validate($request, [
			'token' => 'required'
		]);
	
		try {
			JWTAuth::invalidate($request->token);
			return response()->json([
				'success' => true,
				'message' => 'User logged out successfully'
			]);

		} catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
			return response()->json(['message' => 'Sorry, the user cannot be logged out'], $e->getStatusCode());
		}
	}
}