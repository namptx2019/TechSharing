<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeriesPostTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('series_post', function (Blueprint $table) {
      $table->increments('id');
      $table->unsignedInteger('post_id');
      $table->unsignedInteger('series_id');
      $table->unique(['series_id', 'post_id']);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('series_post');
  }
}
