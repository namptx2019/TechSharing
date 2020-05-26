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

$factory->define(App\Entities\User::class, function (Faker $faker) {
  return [
    'username' => $faker->userName,
    'email' => $faker->unique()->safeEmail,
    'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
    'gender' => rand(0, 1),
    'phone' => $faker->e164PhoneNumber,
    'date_of_birth' => $faker->date('Y-m-d', '2005-01-01'),
    'working_place' => $faker->company,
    'uuid' => $faker->uuid,
    'avatar' => '',
  ];
});
