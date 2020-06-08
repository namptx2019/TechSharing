<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('category', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name', 255);
      $table->string('slug', 255)->nullable();
      $table->text('thumbnail')->nullable();
      $table->unsignedInteger('parent_id')->default(0);
      $table->unsignedInteger('created_by');
      $table->unsignedInteger('updated_by');
      $table->unsignedInteger('status');
      $table->timestamps();
      $table->unsignedInteger('header')->default(0);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('category');
  }
}
