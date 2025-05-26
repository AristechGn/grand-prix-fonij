<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Edition extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'year',
        'start_date',
        'end_date',
        'registration_start_date',
        'registration_deadline',
        'max_participants',
        'description',
        'status', // draft, published, active, completed, archived
        'is_current'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'registration_start_date' => 'datetime',
        'registration_deadline' => 'datetime',
        'is_current' => 'boolean',
    ];

    /**
     * Scope a query to only include the current edition.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCurrent($query)
    {
        return $query->where('is_current', true);
    }

    /**
     * Get the prizes for this edition.
     */
    public function prizes(): HasMany
    {
        return $this->hasMany(Prize::class);
    }

    /**
     * Get the participants for this edition.
     */
    public function participants(): HasMany
    {
        return $this->hasMany(Participant::class);
    }

    /**
     * Get the phases for this edition.
     */
    public function phases(): HasMany
    {
        return $this->hasMany(Phase::class);
    }
} 