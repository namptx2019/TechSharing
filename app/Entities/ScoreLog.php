<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

/**
 * Class ScoreLog.
 *
 * @package namespace App\Entities;
 */
class ScoreLog extends Model implements Transformable
{
    use TransformableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'user_id',
        'entity_id',
        'score',
        'action',
        'entity',
    ];

    protected $hidden = [
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Entity instance of this score log
     * @return BelongsTo
     */
    public function entityInstance() {
        $entity = app('App\Entities' . '\\' . $this->entity);
        return $this->belongsTo($entity, 'entity_id', 'id');
    }
}
