<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Participant extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'edition_id',
        'project_name',
        'project_description',
        'category',
        'submission_date',
        'score',
        'status', // pending, approved, rejected, shortlisted, finalist, winner
        'comments',
        'registration_number'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'submission_date' => 'datetime',
        'score' => 'decimal:2',
    ];

    /**
     * Get the user this participant is associated with.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the edition this participant registered for.
     */
    public function edition(): BelongsTo
    {
        return $this->belongsTo(Edition::class);
    }
} 