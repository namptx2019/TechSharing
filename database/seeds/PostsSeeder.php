<?php

use Illuminate\Database\Seeder;

class PostsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    factory(App\Entities\Post::class, 200)->create();
  }
}
