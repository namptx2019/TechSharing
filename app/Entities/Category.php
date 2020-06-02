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
        'thumbnail',
        'created_by',
        'updated_by',
        'slug',
        'parent_id',
        'status',
        'header'
    ];

    protected $appends = ['full_path'];

    public function getFullPathAttribute()
    {
        return asset('storage/uploads/'.$this->thumbnail);
    }

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

    public function getParent(){
        return $this->belongsTo(Category::class, 'parent_id', 'id')->with('getParent');
    }

    public function getChildrens()
    {
        switch ($this->header) {
            case '1':
                return $this->hasMany(Category::class, 'parent_id', 'id')->with('author')->orderBy('name', 'DESC');

            case '2':
                return $this->hasMany(Category::class, 'parent_id', 'id')->with('author')->orderBy('name', 'ASC');

            case '3':
                return $this->hasMany(Category::class, 'parent_id', 'id')->withCount('hasPosts')->with('author')->orderBy('has_posts_count', 'DESC');

            case '4':
                return $this->hasMany(Category::class, 'parent_id', 'id')->withCount('hasSeries')->with('author')->orderBy('has_series_count', 'DESC');

            default:
                return $this->hasMany(Category::class, 'parent_id', 'id')->with('author');
        }
    }

    public function getPublishChildrens()
    {
        switch ($this->header) {
            case '1':
                return $this->hasMany(Category::class, 'parent_id', 'id')->where('status', 1)->orderBy('name', 'DESC');

            case '2':
                return $this->hasMany(Category::class, 'parent_id', 'id')->where('status', 1)->orderBy('name', 'ASC');

            case '3':
                return $this->hasMany(Category::class, 'parent_id', 'id')->withCount('hasPosts')->where('status', 1)->orderBy('has_posts_count', 'DESC');

            case '4':
                return $this->hasMany(Category::class, 'parent_id', 'id')->withCount('hasSeries')->where('status', 1)->orderBy('has_series_count', 'DESC');

            default:
                return $this->hasMany(Category::class, 'parent_id', 'id')->where('status', 1);
        }
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
