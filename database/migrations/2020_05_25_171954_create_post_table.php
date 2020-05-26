<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('posts', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name', 255);
      $table->text('desc');
      $table->text('thumbnail');
      $table->unsignedInteger('category_id');
      $table->text('content');
      $table->text('slug')->nullable();
      $table->unsignedInteger('language_id')->default(0);
      $table->unsignedInteger('viewed')->default(0);
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
    Schema::dropIfExists('post');
  }
}
