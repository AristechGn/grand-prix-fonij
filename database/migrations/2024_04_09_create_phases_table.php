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
        Schema::create('phases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('edition_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->integer('order')->default(1);
            $table->string('location')->nullable();
            $table->string('color')->default('emerald'); // Pour le style d'affichage
            $table->string('icon')->default('calendar'); // Pour le style d'affichage
            $table->string('status')->default('pending'); // pending, active, completed
            $table->json('activities')->nullable();
            $table->text('objective')->nullable();
            $table->timestamps();
            
            // Indexes for ordering
            $table->index(['edition_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phases');
    }
}; 