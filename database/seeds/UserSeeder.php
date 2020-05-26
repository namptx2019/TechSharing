<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         factory(App\Entities\User::class, 50)->create();
//        DB::table('users')->updateOrInsert([
//            'username' => 'rootad',
//            'email' => 'rootad@root.dev',
//            'password' => Hash::make('1123456'),
//            'gender' => rand(0, 1),
//            'phone' => '0123456789',
//            'date_of_birth' => '2005-01-01',
//            'working_place' => '',
//            'created_at'=> Carbon::now(),
//            'updated_at'=> Carbon::now(),
//        ]);
    }
}
