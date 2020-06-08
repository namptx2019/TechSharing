<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

/**
 * Class SeriesPostRelation.
 *
 * @package namespace App\Entities;
 */
class SeriesPostRelation extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'series_post';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'post_id',
        'series_id'
    ];

}
