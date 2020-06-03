<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\ScoreLog;

/**
 * Class ScoreLogTransformer.
 *
 * @package namespace App\Transformers;
 */
class ScoreLogTransformer extends TransformerAbstract
{
    /**
     * Transform the ScoreLog entity.
     *
     * @param \App\Entities\ScoreLog $model
     *
     * @return array
     */
    public function transform(ScoreLog $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
