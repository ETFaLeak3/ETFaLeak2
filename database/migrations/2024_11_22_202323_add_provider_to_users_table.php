<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('provider')->nullable(); // Ajouter la colonne 'provider'
            $table->string('provider_id')->nullable(); // Ajouter la colonne 'provider_id' pour stocker l'ID de l'utilisateur externe
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['provider', 'provider_id']); // Retirer la colonne 'provider' et 'provider_id'
        });
    }
};
