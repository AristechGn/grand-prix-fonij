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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('edition_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('application_number')->unique();
            $table->string('status')->default('pending'); // pending, validated, rejected, selected, finalist, winner
            
            // Informations personnelles
            $table->string('first_name');
            $table->string('last_name');
            $table->date('birth_date');
            $table->integer('age');
            $table->string('gender');
            $table->string('email');
            $table->string('phone');
            $table->string('city');
            $table->string('region');
            $table->string('education_level');
            $table->string('profession');
            
            // Catégorie et programme
            $table->string('category');
            $table->string('program')->nullable();
            
            // Informations du projet
            $table->string('project_name');
            $table->text('project_summary');
            $table->text('problem_solved');
            $table->text('expected_impact');
            $table->text('target_audience');
            $table->enum('project_launched', ['oui', 'non'])->default('non');
            $table->date('project_start_date')->nullable();
            $table->enum('prototype_exists', ['oui', 'non'])->default('non');
            
            // Disponibilités
            $table->boolean('availability_morning')->default(false);
            $table->boolean('availability_afternoon')->default(false);
            $table->boolean('availability_evening')->default(false);
            
            // Documents
            $table->string('id_document_path')->nullable();
            $table->string('business_plan_path')->nullable();
            $table->string('project_photo_path')->nullable();
            $table->string('presentation_video_url')->nullable();
            
            // Déclarations
            $table->boolean('certification_accuracy')->default(false);
            $table->boolean('free_participation')->default(false);
            $table->boolean('communication_authorization')->default(false);
            
            // Évaluation
            $table->integer('score')->nullable();
            $table->text('evaluation_notes')->nullable();
            $table->json('jury_scores')->nullable();
            
            // Administratif
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            
            $table->timestamps();
            $table->softDeletes();
            
            // Index
            $table->index(['edition_id', 'status']);
            $table->index(['email', 'phone']);
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
