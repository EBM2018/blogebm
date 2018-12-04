<?php

use App\Paragraph;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class ParagraphsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Paragraph::create([
            'content' => 'testtest',
            'article_id' => 1,
            'order' => 1
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
