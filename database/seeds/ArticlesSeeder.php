<?php

use App\Article;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class ArticlesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Article::create([
            'title' => 'Théorie du complot : les chatons ont envahi le monde',
            'summary' => 'De plus en plus nombreux dans les familles mais aussi dans la rue, les chatons s\'organisent pour dominer le monde',
            'author_id' => 1
        ]);
        Article::create([
            'title' => 'Vianney se questionne',
            'summary' => 'Mais t\'es où Hamza ?',
            'author_id' => 1
        ]);
        Article::create([
            'title' => 'Pikachu et Bakura sont de retour',
            'summary' => 'Dans la classe EBM, les émulateurs font rage. Yu-Gi-Oh et Pokémon sont au coeur des esprits. Facebook a du souci à se faire...',
            'author_id' => 1
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
