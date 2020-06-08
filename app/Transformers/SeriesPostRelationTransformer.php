<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\SeriesPostRelation;

/**
 * Class SeriesPostRelationTransformer.
 *
 * @package namespace App\Transformers;
 */
class SeriesPostRelationTransformer extends TransformerAbstract
{
    /**
     * Transform the SeriesPostRelation entity.
     *
     * @param \App\Entities\SeriesPostRelation $model
     *
     * @return array
     */
    public function transform(SeriesPostRelation $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
