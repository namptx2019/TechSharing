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
        $createdBy = $model->createdBy;
        $updatedBy = $model->updatedBy;
        return [
            'id'         => (int) $model->id,
            'title'      => $model->title,
            'thumbnail'  => $model->thumbnail,
            'link'       => $model->link,
            'desc'       => $model->desc,
            'weight'     => $model->weight,
            'status'     => $model->status,
            'created_by' => [
                'username'  => $createdBy->username,
                'uuid'      => $createdBy->uuid
            ],
            'updated_by' => [
                'username'  => $updatedBy->username,
                'uuid'      => $updatedBy->uuid
            ],
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at,
            'thumbnail_fullpath' => $model->full_path,
        ];
    }
}
