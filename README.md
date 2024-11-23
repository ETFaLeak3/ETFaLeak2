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

## ⚙ Mise en place du projet

### 🔨 Installation des outils

Tout d'abord, il vous est demandé d'installer **PHP**

Pour cela, deux solutions, soit Herd Laravel disponible ici -> https://herd.laravel.com/windows (windows) | https://herd.laravel.com/ (macOS et UNIX) 

Soit par commande :

sous windows, ouvrez un powershell et exécutez la commande suivante :

Téléchargement de la dernière version de PHP (remplacez "x64" par "x86" si nécessaire)
```bash
Invoke-WebRequest -Uri https://windows.php.net/downloads/releases/php-8.2.12-Win32-vs16-x64.zip -OutFile php.zip
```

Extraction dans un répertoire (exemple : C:\php)
```bash
Expand-Archive -Path php.zip -DestinationPath C:\php
```

Ajout du répertoire PHP au PATH (si ce n'est pas déjà fait)
```bash
[System.Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\php", [System.EnvironmentVariableTarget]::Machine)
```

Si vous êtes sous un autre OS : https://www.php.net/manual/en/install.php

Il vous faut aussi Composer, qui est un gestionnaire de dépendances pour PHP. Pour cela, exécutez la commande suivante dans votre powershell :

Téléchargement de l'installateur de Composer
```bash
Invoke-WebRequest -Uri https://getcomposer.org/installer -OutFile composer-setup.php
```

Vérification du hash SHA-384 pour des raisons de sécurité
```bash
$HASH = Invoke-WebRequest -Uri https://composer.github.io/installer.sig -UseBasicParsing
if ((Get-FileHash -Path composer-setup.php -Algorithm SHA384).Hash -ne $HASH.Content) {
    Write-Host "Le fichier est corrompu. Installation annulée." -ForegroundColor Red
    exit
}
```

Installation de Composer
```bash
php composer-setup.php --install-dir=C:\php --filename=composer
```

Ajout de Composer au PATH
```bash
[System.Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\php", [System.EnvironmentVariableTarget]::Machine)
```

Suppression du fichier d'installation
```bash
Remove-Item composer-setup.php
```

Si vous êtes sous un autre OS : https://getcomposer.org/download/

Vous devez également installer **git** pour pouvoir travailler avec le repository.

https://git-scm.com/download/win

Il vous faut également **NodeJS** pour le front-end. Pour cela, aller sur ce site : https://nodejs.org/en/download/

<br/>

### 🔐 Installation des dépendances

Tout d'abord, assurez-vous que Laragon soit **démarré**. Si c'est fait, ouvrez le **Terminal** de Laragon. Cela devrait vous ouvrir une fenêtre Cmder. Si vous êtes familié avec le shell Linux, c'est la même syntaxe.

Tout d'abord, rendez-vous dans le répertoire dans lequel vous avez **cloné** le repository. 

Si vous ne l'avez pas encore fait, rendez-vous dans n'importe quelle console, naviguez vers votre répertoire et exécutez la commande suivante :

```bash
git clone https://github.com/ETFaLeak3/ETFaLeak2
```

Une fois le repository cloné, retournez dans votre Cmder, dirigez-vous vers le répertoire DramaQuick, et exécutez les commandes suivantes :

```bash
composer install
```
Cela aura pour effet d'installer les dépendances **PHP** du projet.
Ensuite, exécutez la commande suivante :

```bash
npm install
```
Cela aura pour effet d'installer les dépendances **NodeJS** du projet.

<br/>

### 💻 Lancer le projet en mode développement

Pour lancer le projet en mode développement, vous aurez besoin de deux consoles. Ouvrez-en une première et exécutez la commande suivante dans le répertoire du projet :

```bash
php artisan serve
```
Vous aurez alors un message "[INFO] Server running on http://127.0.0.1:8000" C'est à cet URL que vous devrez vous rendre pour voir le site.

Maintenant, vous allez devoir lancer le serveur de développement du **front-end**. Rendez-vous dans votre seconde console et faites la commande suivante :

```bash
npm run dev
```

Vous verrez alors la ligne "VITE v3.2.5 ready in ... ms". Cela signifie que le serveur **front-end** est s'est lancé avec succès.

Vous pouvez désormais vous rendre à l'adresse http://127.0.0.1:8000 et voir le site !

> 📝 **À noter**<br/>
> Tout le front-end se situe dans `/resources/js/`. Grâce au *🔥 hot reload 🔥*, toute modification appliquée se verra en direct sur votre page, il n'y a pas besoin de relancer le serveur front-end.

## 💾 Base de données

Assurez-vous également que la partie DB de votre fichier .env est identique à la suivante :

```dosini
DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=dramaquick
# DB_USERNAME=root
# DB_PASSWORD=
```

*Libre à vous de modifier les paramètres, mais faites attention à les prendre en compte pour la suite.* 

Tout d'abord, **si vous ne l'avez pas déjà mis en place**, vous devez créer une base de données. Pour cela, vous devez executer la commande suivante dans votre terminal dans le répertoire du projet :

```bash
php artisan migrate
```

<br/>

### 🛠️ Migrations de la base de données

On appelle une migration toute modification appliquée sur la structure de la base de données. 

#### ⚡ Appliquer des migrations

Par défaut, si vous venez de créer la base de données, vous devrez faire la commande suivante dans votre terminal :

```bash
php artisan migrate
```
Cela aura pour effet de mettre en place la première structure de la base de données.

#### ⏳ Status des migrations 

Pour voir les migrations réalisées jusqu'à présent, vous pouvez faire la commande suivante :

```bash
php artisan migrate:status
```
Si vous voyez "Ran" sous status, cela veut dire que la migration a bien été appliquée sur la base de données. Si vous voyez "Pending", c'est que ce n'est pas le cas, auquel cas faites la première commande ci-dessus.

#### 🧩 Créer une migration

Si vous venez à modifier la structure de la base de données, vous devrez exécuter la commande suivante pour créer une migration :

```bash
php artisan make:migration nom_de_la_migration
```
Si Laravel parvient à déterminer les migrations automatiquement, le nouveau fichier créé dans `/database/migrations/` sera pré-rempli. Sinon, vous devrez le remplir vous-même.

> 📝 **À noter**<br/>
> Les migrations créées ne sont pas appliquées par défaut. Vous devrez les appliquer vous-même.

<br/>

## 🎯 Code de conduite

Pour garder un maximum d'organisation, vous êtes priés de respecter une certaine nomenclature sur toute modification que vous apporterez au projet.

- 🚨 Commits compréhensibles, vrais noms de commit
- ❗❗ **Aucun push** sur la branche principale. Pour une nouvelle fonctionnalité, créez une nouvelle branche et nommez la de la façon suivante : `features/authentication` ou `features/dessin_quiz`, par exemple. Si la fonctionnalité existe déjà, libre à vous de push sur cette branche-ci. Une fois les features finies, un **dev senior** s'occupera de merge sur la branche principale.
- 🛠️ Vrais noms de migrations compréhensibles
- ✨ Utiliser https://gitmoji.dev/ pour les emojis des commits

<br/>

> ***Optionnel*** : si vous pouvez préciser les modifications/ajouts que vous faites ailleurs (Figma, Notion), faites-le, cela permet de tenir l'équipe entière au courant et de ne pas faire de travail en double ! 😀