<?php

use Illuminate\Database\Seeder;

class SeriesSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    factory(App\Entities\Series::class, 30)->create();
  }
}
