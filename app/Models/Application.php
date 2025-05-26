<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Les attributs qui sont mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'edition_id',
        'user_id',
        'application_number',
        'status',
        'first_name',
        'last_name',
        'birth_date',
        'age',
        'gender',
        'email',
        'phone',
        'city',
        'region',
        'education_level',
        'profession',
        'category',
        'program',
        'project_name',
        'project_summary',
        'problem_solved',
        'expected_impact',
        'target_audience',
        'project_launched',
        'project_start_date',
        'prototype_exists',
        'availability_morning',
        'availability_afternoon',
        'availability_evening',
        'id_document_path',
        'business_plan_path',
        'project_photo_path',
        'presentation_video_url',
        'certification_accuracy',
        'free_participation',
        'communication_authorization',
        'score',
        'evaluation_notes',
        'jury_scores',
        'submitted_at',
        'reviewed_at',
        'reviewed_by',
    ];

    /**
     * Les attributs qui doivent être convertis.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birth_date' => 'date',
        'project_start_date' => 'date',
        'availability_morning' => 'boolean',
        'availability_afternoon' => 'boolean',
        'availability_evening' => 'boolean',
        'certification_accuracy' => 'boolean',
        'free_participation' => 'boolean',
        'communication_authorization' => 'boolean',
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime',
        'jury_scores' => 'array',
        'age' => 'integer',
        'score' => 'integer',
    ];

    /**
     * Obtient l'édition associée à cette candidature.
     */
    public function edition(): BelongsTo
    {
        return $this->belongsTo(Edition::class);
    }

    /**
     * Obtient l'utilisateur associé à cette candidature.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Obtient l'utilisateur qui a examiné cette candidature.
     */
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * Obtient les commentaires associés à cette candidature.
     */
    public function comments()
    {
        return $this->hasMany(ApplicationComment::class);
    }

    /**
     * Scope pour obtenir les candidatures par statut.
     */
    public function scopeWhereStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope pour obtenir les candidatures par édition.
     */
    public function scopeWhereEdition($query, $editionId)
    {
        return $query->where('edition_id', $editionId);
    }

    /**
     * Scope pour obtenir les candidatures par catégorie.
     */
    public function scopeWhereCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Génère un numéro de candidature unique.
     */
    public static function generateApplicationNumber(): string
    {
        $year = date('Y');
        $month = date('m');
        $day = date('d');
        $random = strtoupper(substr(uniqid(), -4));
        
        return "FONIJ-{$year}{$month}{$day}-{$random}";
    }
}
