<br/>
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmoEKpp2xduxbrUK1vGPGzdJ91CLf3scrtwg&s" width="350"></a></p>
<br/>
<p align="center"> 
    <img src="https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white"/>
    <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwind css&logoColor=white"/>
    <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white"/>
</p>

<hr/>

> ❗ **Attention**<br/>
> **Ce README changera à l'avenir.** Vous en serez informé sur Discord.

<br/>

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils nécessaires.

### 🐘 1. PHP et Composer avec Herd Laravel (Recommandé)

**[Herd](https://herd.laravel.com/)** est un outil qui simplifie la configuration de votre environnement Laravel, principalement sur **macOS** et **Windows**.

1. **Téléchargez Herd** : Rendez-vous sur [herd.laravel.com](https://herd.laravel.com/) et installez-le. 
(lien windows : [ici](https://herd.laravel.com/download/windows)) | (lien macOS : [ici](https://herd.laravel.com/download))
2. **Configurez Herd** :
   - Ajoutez votre projet dans Herd.
   - Activez les services essentiels : **PHP**, **MySQL**, et **Redis**.
3. **Vérifiez vos versions** :
   ```bash
   php -v
   composer -V
   ```
#### Installation manuelle
Si Herd n'est pas disponible sur votre système :

- Windows/macOS : Installez PHP via des outils comme Homebrew pour macOS ou un installateur PHP.
- Linux : Installez PHP et Composer via votre gestionnaire de paquets :
    ```bash
    sudo apt update && sudo apt install php-cli composer
    ```
- Vérifiez que tout est bien installé :
    ```bash
    php -v
    composer -V
    ```

### 💻 Node.js et pnpm
#### Étape 1 : Installer Node.js
- Téléchargez et installez la version LTS de Node.js depuis nodejs.org.
- Vérifiez l'installation :
    ```bash
    node -v
    ```
#### Étape 2 : Installer pnpm
Une fois Node.js installé, ajoutez pnpm globalement :

```bash
npm install -g pnpm
```
Vérifiez l'installation de pnpm :

```bash
pnpm -v
```

## ⚙️ Configuration initiale
### 🛠️ Modifier le fichier php.ini
Laravel requiert que la directive variables_order dans php.ini soit correctement configurée pour éviter des erreurs au démarrage.

#### Comment faire ? :
1. Ouvrez le fichier php.ini (trouvé via Herd ou dans votre installation PHP).
2. Remplacez ou ajoutez la ligne suivante :
    ```ini
    variables_order = "GPCS"
    ```
3. Relancez PHP pour appliquer les changements.

## 🚀 Installation
Voici les étapes pour installer et configurer votre projet.

### 1️⃣ Cloner le projet
```bash
git clone <url-du-dépôt>
cd <nom-du-projet>
```
### 2️⃣ Installer les dépendances PHP
```bash
composer install
```
### 3️⃣ Installer les dépendances Node.js
```bash
pnpm install
```
### 4️⃣ Configurer l'environnement
#### Copier le fichier d'exemple .env :
```bash
cp .env.example .env
```
### 5️⃣ Configurer la base de données
#### Appliquez les migrations pour créer les tables :
```bash
php artisan migrate
```

## 🛠️ Lancer le projet
### 🧑‍💻 Mode développement
1. Démarrez le backend Laravel dans un premier terminal :
    ```bash
    php artisan serve
    ```
2. Lancez le frontend Svelte dans un second terminal :
    ```bash
    pnpm dev
    ```
### 🌐 Mode production (optionnel)
1. Compilez les fichiers Svelte pour la production :
```bash
pnpm build
```
2. Configurez un serveur web (Apache, Nginx, etc.) pour servir le projet.

## ❓ Dépannage
### 🔧 Commandes manquantes ?
- #### Assurez-vous que php, composer, et pnpm sont dans votre $PATH.
### 🛑 Problèmes avec Laravel ?
- #### Réinitialisez les caches :
    ```bash
    php artisan cache:clear
    php artisan config:clear
    php artisan route:clear
    php artisan view:clear
    ```

## 📚 Ressources supplémentaires

### 🖌️ Frontend
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview) : Guide complet pour maîtriser Svelte 5.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) : Documentation officielle pour intégrer TypeScript à vos projets.
- [TailwindCSS Documentation](https://tailwindcss.com/docs) : Tout ce que vous devez savoir sur ce framework CSS utilitaire.
- [Next.shadcn-svelte](https://next.shadcn-svelte.com/docs) : Un framework puissant pour les composants UI basés sur TailwindCSS avec Svelte. (Attention ! Ne pas utilisé les composants utilisant SvelteKit !)

### 🔧 Backend
- [Laravel Documentation](https://laravel.com/docs) : Guide officiel pour Laravel.
- [Laravel Breeze](https://laravel.com/docs/11.x/starter-kits#laravel-breeze) : Installation et configuration de Breeze pour l'authentification légère.
- [Laravel Socialite](https://laravel.com/docs/socialite) : Intégration de l'authentification OAuth pour les plateformes comme Google, Facebook, etc.


## 🎯 Code de conduite

Pour garder un maximum d'organisation, vous êtes priés de respecter une certaine nomenclature sur toute modification que vous apporterez au projet.

- 🚨 Commits compréhensibles, vrais noms de commit
- ❗❗ **Aucun push** sur la branche principale. Pour une nouvelle fonctionnalité, créez une nouvelle branche et nommez la de la façon suivante : `features/authentication` ou `features/dessin_quiz`, par exemple. Si la fonctionnalité existe déjà, libre à vous de push sur cette branche-ci. Une fois les features finies, un **dev senior** s'occupera de merge sur la branche principale.
- 🛠️ Vrais noms de migrations compréhensibles
- ✨ Utiliser https://gitmoji.dev/ pour les emojis des commits

<br/>

> ***Optionnel*** : si vous pouvez préciser les modifications/ajouts que vous faites ailleurs (Figma, Notion), faites-le, cela permet de tenir l'équipe entière au courant et de ne pas faire de travail en double ! 😀