<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Category;

/**
 * Class CategoryTransformer.
 *
 * @package namespace App\Transformers;
 */
class CategoryTransformer extends TransformerAbstract
{
    /**
     * Transform the Category entity.
     *
     * @param \App\Entities\Category $model
     *
     * @return array
     */
    public function transform(Category $model)
    {
        return [
            'id'            => (int) $model->id,
            'name'          => $model->name,
            'text'          => $model->name,
            'slug'          => $model->slug,
            'status'        => $model->status,
            'created_by'    => $model->author,
            'updated_by'    => $model->lastUpdateBy,
            'created_at'    => $model->created_at,
            'updated_at'    => $model->updated_at,
        ];
    }
}
