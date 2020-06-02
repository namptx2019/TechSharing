<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

/**
 * Class UserAvatar.
 *
 * @package namespace App\Entities;
 */
class UserAvatar extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'user_ava';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'link',
        'status'
    ];

    protected $hidden = [
        'user_id'
    ];

    protected $appends = ['full_path'];

    public function getFullPathAttribute()
    {
        return asset('storage/uploads/'.$this->link);
    }
}
