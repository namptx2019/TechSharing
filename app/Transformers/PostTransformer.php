<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\Post;
use Carbon\Carbon;

/**
 * Class PostTransformer.
 *
 * @package namespace App\Transformers;
 */
class PostTransformer extends TransformerAbstract
{
    /**
     * Transform the Post entity.
     *
     * @param \App\Entities\Post $model
     *
     * @return array
     */
    public function transform(Post $model)
    {
        $diffForHumans_created = Carbon::parse($model->created_at)->diffForHumans();
        $diffForHumans_updated = Carbon::parse($model->created_at)->diffForHumans();

        return [
            'id'            => (int) $model->id,
            'name'          => $model->name,
            'description'   => $model->desc,
            'thumbnail'     => $model->thumbnail,
            'thumbnailFullpath' => asset('storage/uploads/'.$model->thumbnail),
            'category_id'   => $model->category_id,
            'category'      => $model->category,
            'content'       => $model->content,
            'slug'          => $model->slug,
            'viewed'        => $model->viewed,
            'author'        => $model->author,
            'relate'        => $model->related->take(4),
            'last_update_by'=> $model->lastUpdateBy,
            'status'        => $model->status,
            'created_at'    => $model->created_at,
            'updated_at'    => $model->updated_at,
            'diff_created'  => $diffForHumans_created,
            'diff_updated'  => $diffForHumans_updated,
            'series'        => collect($model->series)->pluck('id'),

            //thumbnail full path
            'full_path'     => $model->full_path,
        ];
    }
}
