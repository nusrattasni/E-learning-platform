<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Certificate;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::with(['course.instructor'])
            ->where('user_id', auth()->id())
            ->orderByDesc('issued_at')
            ->get();

        return Inertia::render('Certificates/Index', [
            'certificates' => $certificates
        ]);
    }

    public function show($uuid)
    {
        $certificate = Certificate::with(['course.instructor', 'user'])
            ->where('certificate_id', $uuid)
            ->firstOrFail();

        return Inertia::render('Certificates/Show', [
            'certificate' => $certificate
        ]);
    }
}
