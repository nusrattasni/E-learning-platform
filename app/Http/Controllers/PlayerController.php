<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

class PlayerController extends Controller
{
    public function show($token)
    {
        try {
            $videoUrl = Crypt::decryptString($token);
            
            // Format YouTube URL to embed format if needed
            if (strpos($videoUrl, 'youtube.com') !== false || strpos($videoUrl, 'youtu.be') !== false) {
                $videoId = '';
                if (strpos($videoUrl, 'v=') !== false) {
                    $videoId = explode('&', explode('v=', $videoUrl)[1])[0];
                } elseif (strpos($videoUrl, 'youtu.be/') !== false) {
                    $videoId = explode('?', explode('youtu.be/', $videoUrl)[1])[0];
                }
                
                if ($videoId) {
                    $videoUrl = "https://www.youtube.com/embed/{$videoId}?rel=0&modestbranding=1&showinfo=0";
                }
            }

            return view('player', ['videoUrl' => $videoUrl]);
        } catch (DecryptException $e) {
            abort(403, 'Invalid or expired video token.');
        }
    }
}
