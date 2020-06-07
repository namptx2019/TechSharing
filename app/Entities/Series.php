<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
use Cviebrock\EloquentSluggable\Sluggable;

/**
 * Class Series.
 *
 * @package namespace App\Entities;
 */
class Series extends Model implements Transformable
{
    use TransformableTrait;
    use Sluggable;

    protected $table = 'series';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'name',
        'desc',
        'poster',
        'slug',
        'category_id',
        'created_by',
        'updated_by',
        'status',
        'viewed',
    ];

    protected $appends = ['full_path'];

    public function getFullPathAttribute()
    {
        return asset('storage/uploads/'.$this->poster);
    }

    /**
     * Auto generate slug by name
     */
    public function sluggable()
    {
        return [
            'slug' => [
                'source'    => 'name',
                'onUpdate'  => true
            ]
        ];
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'created_by', 'id')->with('avatars');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function lastUpdateBy(){
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

    public function getAllPosts($limit = 0){
        if($limit === 0){
            return $this->belongsToMany(Post::class, 'series_post', 'series_id', 'post_id');
        }
        return $this->belongsToMany(Post::class, 'series_post', 'series_id', 'post_id')->orderBy('id', 'desc')->take($limit)->get();
    }
}
