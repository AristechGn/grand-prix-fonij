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
        Schema::create('participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('edition_id')->constrained()->onDelete('cascade');
            $table->string('project_name');
            $table->text('project_description');
            $table->string('category')->nullable();
            $table->timestamp('submission_date')->useCurrent();
            $table->decimal('score', 5, 2)->nullable();
            $table->string('status')->default('pending'); // pending, approved, rejected, shortlisted, finalist, winner
            $table->text('comments')->nullable();
            $table->string('registration_number')->unique();
            $table->timestamps();
            
            // Ensure unique participation per edition
            $table->unique(['user_id', 'edition_id']);
            
            // Common indexes
            $table->index(['edition_id', 'status']);
            $table->index('registration_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
}; 