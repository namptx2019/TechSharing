<?php

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

$factory->define(App\Entities\Post::class, function (Faker $faker) {
  $img_list = [
    "/posts/1.jpg",
    "/posts/2.jpg",
    "/posts/3.jpg",
    "/posts/4.jpg",
    "/posts/5.jpg",
    "/posts/6.jpg",
    "/posts/7.jpg",
    "/posts/8.jpg",
    "/posts/9.jpg",
    "/posts/10.jpg",
    "/posts/11.jpg",
    "/posts/12.jpg",
    "/posts/13.jpg",
    "/posts/14.jpg",
    "/posts/15.jpg",
    "/posts/16.jpg",
  ];
  return [
    'name'        => $faker->realText(rand(20, 40)),
    'desc'        => $faker->realText(rand(40, 80)),
    'thumbnail'   => $img_list[rand(0, 15)],
    'category_id' => rand(1, 5),
    'content'     => $faker->realText(200),
    'slug'        => $faker->slug,
    'viewed'      => rand(10, 99),
    'created_by'  => rand(1, 10),
    'updated_by'  => rand(1, 10),
    'status'      => 1
  ];
});
