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
            'content' => 'Ils sont dans les villes, dans les campagnes et dans ce premier paragraphe',
            'article_id' => 1,
            'order' => 1
        ]);
        Paragraph::create([
            'content' => 'Les Maestro marchent pendant que les EBMs regardent ce second paragraphe',
            'article_id' => 1,
            'order' => 2
        ]);
        Paragraph::create([
            'content' => 'Mais qui peut bien s\'occuper de ce dernier paragraphe ?',
            'article_id' => 1,
            'order' => 3
        ]);
        Paragraph::create([
            'content' => 'Hamza reviens :c',
            'article_id' => 2,
            'order' => 1
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
