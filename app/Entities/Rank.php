<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
use Cviebrock\EloquentSluggable\Sluggable;

/**
 * Class Rank.
 *
 * @package namespace App\Entities;
 */
class Rank extends Model implements Transformable
{
    use TransformableTrait;
    use Sluggable;


    protected $table = 'rank';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'medal',
        'min_score',
        'max_score',
        'created_at',
        'updated_at',
        'created_by',
        'updated_by',
    ];

    /**
     * The atttribute allow for searching
     */
    protected $fieldSearchable = [
        'name', 'slug',
    ];

    protected $appends = ['full_path'];

    public function getFullPathAttribute()
    {
        return asset('storage/uploads/'.$this->medal);
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

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }


}
