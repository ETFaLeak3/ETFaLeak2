<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class OAuthController extends Controller
{
    // Redirection vers Google pour l'authentification
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    // Callback après l'authentification
    public function handleProviderCallback($provider)
    {
        // Récupérer les informations de l'utilisateur depuis le fournisseur OAuth (Google, GitHub, etc.)
        $socialUser = Socialite::driver($provider)->user();

        // Vérifier si l'utilisateur existe déjà dans la base de données
        $user = User::where('email', $socialUser->getEmail())->first();

        if (!$user) {
            // Si l'utilisateur n'existe pas, créez un nouvel utilisateur
            $user = User::create([
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
                'password' => bcrypt(Str::random(16)),
                'provider' => $provider,
                'provider_id' => $socialUser->getId()
            ]);
        }

        // Authentifier l'utilisateur
        Auth::login($user, true);

        // Rediriger vers la page d'accueil ou une page protégée
        return redirect()->intended('/');
    }
}