<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Series;

/**
 * Class SeriesTransformer.
 *
 * @package namespace App\Transformers;
 */
class SeriesTransformer extends TransformerAbstract
{
    /**
     * Transform the Series entity.
     *
     * @param \App\Entities\Series $model
     *
     * @return array
     */
    public function transform(Series $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
