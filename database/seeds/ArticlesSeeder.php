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
            'title' => 'Bonjour !',
            'author_id' => 1
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
