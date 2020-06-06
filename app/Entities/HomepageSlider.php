<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

/**
 * Class HomepageSlider.
 *
 * @package namespace App\Entities;
 */
class HomepageSlider extends Model implements Transformable
{
    use TransformableTrait;

    /**
     * Table name
     */
    protected $table = 'homepage_slider';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'thumbnail',
        'link',
        'desc',
        'created_by',
        'updated_by',
        'status'
    ];

    protected $appends = ['full_path'];

    public function getFullPathAttribute()
    {
        return asset('storage/uploads/'.$this->thumbnail);
    }

    /**
     * Created by
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    /**
     * Updated by
     */
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

}
