<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

/**
 * Class Comment.
 *
 * @package namespace App\Entities;
 */
class Comment extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'comment';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'post_id',
        'content',
    ];

    public function author(){
        return $this->belongsTo(User::class, 'user_id', 'id')->with('avatars');
    }

    public function post(){
        return $this->belongsTo(Post::class, 'post_id', 'id');
    }
}
