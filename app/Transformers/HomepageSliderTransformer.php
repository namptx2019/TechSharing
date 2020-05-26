<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\HomepageSlider;

/**
 * Class HomepageSliderTransformer.
 *
 * @package namespace App\Transformers;
 */
class HomepageSliderTransformer extends TransformerAbstract
{
    /**
     * Transform the HomepageSlider entity.
     *
     * @param \App\Entities\HomepageSlider $model
     *
     * @return array
     */
    public function transform(HomepageSlider $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
