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
            'content' => 'Un premier paragraphe',
            'article_id' => 1,
            'order' => 1
        ]);
        Paragraph::create([
            'content' => 'Un second paragraphe',
            'article_id' => 1,
            'order' => 2
        ]);
        Paragraph::create([
            'content' => 'Un paragraphe sur cet autre article',
            'article_id' => 2,
            'order' => 1
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
