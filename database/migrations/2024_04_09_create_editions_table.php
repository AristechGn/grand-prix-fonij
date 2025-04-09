<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('editions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->year('year');
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->timestamp('registration_deadline')->nullable();
            $table->integer('max_participants')->default(0);
            $table->text('description')->nullable();
            $table->string('status')->default('draft'); // draft, published, active, completed, archived
            $table->boolean('is_current')->default(false);
            $table->timestamps();

            // Ensure only one current edition
            $table->index('is_current');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('editions');
    }
}; 