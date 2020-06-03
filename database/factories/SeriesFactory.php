<?php
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Entities\Series::class, function (Faker $faker) {
  return [
    'name'        => $faker->name,
    'desc'        => $faker->realText(rand(20, 40)),
    'poster'      => $faker->url,
    'slug'        => $faker->slug,
    'category_id' => rand(0, 4),
    'viewed'      => rand(100, 400),
    'status'      => rand(0, 1),
    'created_by'  => 12,
    'updated_by'  => 23
  ];
});
