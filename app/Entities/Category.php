<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
use Cviebrock\EloquentSluggable\Sluggable;

/**
 * Class Category.
 *
 * @package namespace App\Entities;
 */
class Category extends Model implements Transformable
{
    use TransformableTrait;
    use Sluggable;

    protected $table = 'category';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'created_by',
        'updated_by',
        'slug',
        'status'
    ];

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
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function lastUpdateBy()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }


    public function hasSeries()
    {
        return $this->hasMany(Series::class, 'category_id', 'id')->with('author');
    }

    public function hasPosts()
    {
        return $this->hasMany(Post::class, 'category_id', 'id')->with('author');
    }
}
