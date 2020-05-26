<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\UserAvatar;

/**
 * Class UserAvatarTransformer.
 *
 * @package namespace App\Transformers;
 */
class UserAvatarTransformer extends TransformerAbstract
{
    /**
     * Transform the UserAvatar entity.
     *
     * @param \App\Entities\UserAvatar $model
     *
     * @return array
     */
    public function transform(UserAvatar $model)
    {
        return [
            'id'         => (int) $model->id,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
