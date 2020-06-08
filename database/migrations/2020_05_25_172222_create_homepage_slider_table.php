<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHomepageSliderTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('homepage_slider', function (Blueprint $table) {
      $table->increments('id');
      $table->string('title', 255);
      $table->text('thumbnail');
      $table->text('link');
      $table->text('desc');
      $table->unsignedInteger('created_by');
      $table->unsignedInteger('updated_by');
      $table->unsignedInteger('status')->default(0);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('homepage_slider');
  }
}
