<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApplicationComment extends Model
{
    use HasFactory;

    /**
     * Les attributs qui sont mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'application_id',
        'user_id',
        'content',
        'is_private',
        'is_note',
    ];

    /**
     * Les attributs qui doivent être convertis.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_private' => 'boolean',
        'is_note' => 'boolean',
    ];

    /**
     * Récupère la candidature associée à ce commentaire.
     */
    public function application(): BelongsTo
    {
        return $this->belongsTo(Application::class);
    }

    /**
     * Récupère l'utilisateur qui a créé ce commentaire.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
