<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        User::create([
            'name' => 'EBM',
            'email' => 'EBM@EBM.ebm',
            'password' => bcrypt('hamzaoutai'),
        ]);
        Schema::enableForeignKeyConstraints();
    }
}
