<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class User.
 *
 * @package namespace App\Entities;
 */
class User extends Authenticatable implements Transformable
{
    use TransformableTrait, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'gender',
        'phone',
        'date_of_birth',
        'working_place',
        'facebook',
        'skype',
        'twitter',
        'linkedin',
        'entry',
        'ip_last',
        'location',
        'country',
        'role_id',
        'status',
        'uuid',
        'avatar',
        'default_language',
        'settings',
        'score'
    ];

    /**
     * Using bit for display settings
     */
    public static $settings =  [
        'display_email'     => 1,
        'display_facebook'  => 2,
        'display_skype'     => 4,
        'display_phone'     => 8,
        'display_dob'       => 16,
        'display_twitter'   => 32,
        'display_linkedin'  => 64
    ];

    public static $settingsConverted =  [
        'email'         => 1,
        'facebook'      => 2,
        'skype'         => 4,
        'phone'         => 8,
        'date_of_birth' => 16,
        'twitter'       => 32,
        'linkedin'      => 64
    ];

    /**
     * Genders ref.
     */
    protected $genders = [
        'Male', 'Female', 'Others'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'id', 'password', 'remember_token', 'avatar'
    ];

    public function hasComment()
    {
        return $this->hasMany(Comment::class, 'user_id', 'id');
    }

    public function avatars()
    {
        return $this->hasMany(UserAvatar::class, 'user_id', 'id')->where('status',1);
    }

    public function getGender()
    {
        return $this->genders[$this->gender];
    }

    public function scoreLogs()
    {
        return $this->hasMany(ScoreLog::class, 'user_id', 'id')
            ->orderBy('created_at', 'DESC');
    }

    /**
     * @return array
     */
    public function rank()
    {
        $rank = Rank::where('min_score', '<=', $this->score)
            ->where('max_score', '>=', $this->score)
            ->first();
        if (empty($rank))
            return [
                'name' => 'No rank',
                'thumbnail' => ''
            ];
        else return [
            'name' => $rank->name,
            'thumbnail' => $rank->full_path,
        ];
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id');
    }

    public function hasRole()
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }
}
