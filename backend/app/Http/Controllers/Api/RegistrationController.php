<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegistrationController extends Controller
{
    // Új csapat regisztrációja
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'school_name'   => 'required|string|max:255',
            'teacher_name'  => 'required|string|max:255',
            'teacher_email' => 'required|email|max:255',
            'teacher_phone' => 'required|string|max:50',
            'team_name'     => 'required|string|max:255',
            'member1_name'  => 'required|string|max:255',
            'member2_name'  => 'required|string|max:255',
            'member3_name'  => 'required|string|max:255',
            'team_email'    => 'required|email|unique:registrations,team_email|max:255',
        ], [
            'team_email.unique' => 'Ezzel a csapat e-mail címmel már regisztráltak!',
            'required'          => 'Minden mező kitöltése kötelező!'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $registration = Registration::create($request->all());

        return response()->json([
            'status'  => 'success',
            'message' => 'Sikeres regisztráció a #DigitSkills versenyre!',
            'data'    => $registration
        ], 201);
    }

    // Regisztrált csapatok listája (pl. admin felületre)
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data'   => Registration::all()
        ], 200);
    }
}