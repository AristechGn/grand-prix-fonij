<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'email_verified_at',
        'phone_verified_at',
        'role',
        'password',
        'address',
        'birth_date',
        'gender',
        'profession',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'phone_verified_at' => 'datetime',
            'birth_date' => 'date',
            'password' => 'hashed',
        ];
    }

    /**
     * Check if the user is a super admin.
     *
     * @return bool
     */
    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }
    
    /**
     * Check if the user is an admin.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if the user is a user.
     *
     * @return bool
     */
    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    /**
     * Check if the user is a candidate.
     *
     * @return bool
     */
    public function isCandidate(): bool
    {
        return $this->role === 'candidate';
    }

    /**
     * Check if the user is a jury.
     *
     * @return bool
     */
    public function isJury(): bool
    {
        return $this->role === 'jury';
    }
    
    /**
     * Check if the user has a specific role or one of the roles.
     *
     * @param string|array $roles
     * @return bool
     */
    public function hasRole($roles): bool
    {
        if (is_array($roles)) {
            return in_array($this->role, $roles);
        }
        
        return $this->role === $roles;
    }
    
    /**
     * Get the applications submitted by this user.
     */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
    
    /**
     * Get the applications reviewed by this user.
     */
    public function reviewedApplications(): HasMany
    {
        return $this->hasMany(Application::class, 'reviewed_by');
    }
    
    /**
     * Get the comments made by this user.
     */
    public function applicationComments(): HasMany
    {
        return $this->hasMany(ApplicationComment::class);
    }
}
