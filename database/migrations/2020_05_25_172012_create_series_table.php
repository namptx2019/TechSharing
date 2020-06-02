<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeriesTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('series', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name', 255);
      $table->text('desc');
      $table->text('poster');
      $table->text('slug')->nullable();
      $table->unsignedInteger('category_id');
      $table->unsignedInteger('viewed')->default(0);
      $table->unsignedInteger('status')->default(0);
      $table->unsignedInteger('created_by');
      $table->unsignedInteger('updated_by');
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
    Schema::dropIfExists('series');
  }
}
