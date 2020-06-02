<?php

namespace App\Entities;

use App\Presenters\PostPresenter;
use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;

/**
 * Class Post.
 *
 * @package namespace App\Entities;
 */
class Post extends Model implements Transformable
{
    use TransformableTrait;
    use Sluggable;

    protected $table = 'post';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'desc',
        'thumbnail',
        'category_id',
        'content',
        'slug',
        'language_id',
        'viewed',
        'created_by',
        'updated_by',
        'status'
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
        return asset('storage/uploads/'.$this->thumbnail);
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

    public function author()
    {
        return $this->belongsTo(User::class, 'created_by', 'id')->with('avatars');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id')->with('getParent');
    }

    public function lastUpdateBy()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

    public function language()
    {
        return $this->belongsTo(Lang::class, 'language_id', 'id');
    }

    public function series()
    {
        return $this->belongsToMany(Series::class, 'series_post', 'post_id', 'series_id');
    }

    public function related()
    {
        return $this->hasMany(Post::class, 'category_id', 'category_id')->with('author');
    }

    public function favorited()
    {
        return $this->hasMany(Favorite::class, 'entity_id', 'id');
    }

    public function categoryName()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id')->select('id','name');
    }
}
