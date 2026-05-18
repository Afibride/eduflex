<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function registerSchool(Request $request)
    {
        try {
            Log::info('Registration request received', $request->all());
            
            $validator = Validator::make($request->all(), [
                'schoolName' => 'required|string|max:255',
                'schoolType' => 'required|string',
                'address' => 'nullable|string',
                'city' => 'required|string',
                'region' => 'required|string',
                'phone' => 'required|string',
                'email' => 'required|email|unique:schools,email',
                'website' => 'nullable|url',
                'principalName' => 'required|string',
                'curriculum' => 'required|array',
                'password' => 'required|string|min:8',
            ]);

            if ($validator->fails()) {
                Log::error('Validation failed', $validator->errors()->toArray());
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Generate school code
            $code = 'SCH-' . strtoupper(Str::random(6));

            $school = School::create([
                'name' => $request->schoolName,
                'code' => $code,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'city' => $request->city,
                'region' => $request->region,
                'principal_name' => $request->principalName,
                'website' => $request->website,
                'curriculum' => $request->curriculum,
                'status' => 'active',
            ]);

            // Create admin user
            $adminUser = User::create([
                'school_id' => $school->id,
                'name' => $request->principalName,
                'email' => $request->email,
                'phone' => $request->phone,
                'user_id' => $code . '-ADMIN-001',
                'role' => 'admin',
                'password' => Hash::make($request->password),
                'is_active' => true,
                'activated_at' => now(),
            ]);

            Log::info('School registered successfully', ['school_id' => $school->id]);

            return response()->json([
                'message' => 'School registered successfully',
                'school' => $school,
                'user' => $adminUser,
            ], 201);
            
        } catch (\Exception $e) {
            Log::error('Registration error: ' . $e->getMessage());
            return response()->json(['error' => 'Registration failed: ' . $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            Log::info('Login attempt', ['email' => $request->email]);
            
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string',
                'school_id' => 'nullable|exists:schools,id',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                Log::warning('Invalid credentials for email: ' . $request->email);
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            if (!$user->is_active) {
                Log::warning('Account not activated for email: ' . $request->email);
                return response()->json(['error' => 'Account not activated'], 403);
            }

            if ($request->school_id && $user->school_id != $request->school_id) {
                Log::warning('User does not belong to school', ['user_school' => $user->school_id, 'request_school' => $request->school_id]);
                return response()->json(['error' => 'User does not belong to this school'], 403);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            Log::info('Login successful', ['user_id' => $user->id, 'role' => $user->role]);

            return response()->json([
                'success' => true,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'user_id' => $user->user_id,
                    'school_id' => $user->school_id,
                ],
                'token' => $token,
            ]);
            
        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage());
            return response()->json(['error' => 'Login failed: ' . $e->getMessage()], 500);
        }
    }

    public function getSchools()
    {
        try {
            $schools = School::where('status', 'active')->get();
            return response()->json($schools);
        } catch (\Exception $e) {
            Log::error('Failed to fetch schools: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch schools'], 500);
        }
    }

    // Activate Account
    public function activateAccount(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string|exists:users,user_id',
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('user_id', $request->user_id)
                    ->where('email', $request->email)
                    ->first();

        if (!$user) {
            return response()->json(['error' => 'Invalid user ID or email'], 404);
        }

        if ($user->is_active) {
            return response()->json(['error' => 'Account already activated'], 400);
        }

        $user->update([
            'password' => Hash::make($request->password),
            'is_active' => true,
            'activated_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Account activated successfully',
        ]);
    }

    // Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    // Get Current User
    public function me(Request $request)
    {
        $user = $request->user()->load('school');
        
        $profile = null;
        if ($user->isStudent()) {
            $profile = $user->student;
        } elseif ($user->isTeacher()) {
            $profile = $user->teacher;
        } elseif ($user->isParent()) {
            $profile = $user->parent;
        }

        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }
}
