<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

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
        // Récupérer les informations de l'utilisateur
        $socialUser = Socialite::driver($provider)->user();

        // Vérifier si l'utilisateur existe déjà
        $user = User::where('email', $socialUser->getEmail())->first();

        if (!$user) {
            // Créer un nouvel utilisateur si inexistant
            $user = User::create([
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
                'password' => bcrypt(Str::random(16)),
                'provider' => $provider,
                'provider_id' => $socialUser->getId()
            ]);
        }

        // Enregistrer ou mettre à jour l'avatar si disponible
        if ($socialUser->getAvatar()) {
            $this->storeAvatar($user->id, $socialUser->getAvatar());
        }

        // Authentifier l'utilisateur
        Auth::login($user, true);

        // Redirection
        return redirect()->intended('/profile');
    }

    /**
     * Enregistre l'avatar de l'utilisateur.
     *
     * @param int $userId
     * @param string $avatarUrl
     * @return void
     */
    protected function storeAvatar($userId, $avatarUrl)
    {
        try {
            // Télécharger l'avatar
            $avatarContent = file_get_contents($avatarUrl);

            // Convertir et redimensionner l'image
            $finalImage = Image::make($avatarContent)->encode('webp', 90);
            $finalImage->fit(500);

            // Enregistrer l'avatar
            $destinationPath = public_path('avatars/');
            $finalImage->save($destinationPath . $userId . '.webp');
        } catch (\Exception $e) {
            // Gérer les erreurs de téléchargement ou de traitement
            \Log::error('Erreur lors de l\'enregistrement de l\'avatar : ' . $e->getMessage());
        }
    }
}