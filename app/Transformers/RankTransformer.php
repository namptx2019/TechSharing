<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Rank;
use Carbon\Carbon;

/**
 * Class RankTransformer.
 *
 * @package namespace App\Transformers;
 */
class RankTransformer extends TransformerAbstract
{
    /**
     * Transform the Contest entity.
     *
     * @param \App\Entities\Rank $model
     *
     * @return array
     */
    public function transform(Contest $model)
    {
        return [
            'id'         => (int) $model->id,
            'name'       => $model->name,
            'medal'      => $model->medal,
            'point'      => $model->point,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at,

            //medal full path
            'full_path'  => $model->full_path,
        ];
    }
}
