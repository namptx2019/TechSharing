<?php

namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Entities\User;
use App\Entities\Rank;

/**
 * Class UserTransformer.
 *
 * @package namespace App\Transformers;
 */
class UserTransformer extends TransformerAbstract
{
    /**
     * Transform the User entity.
     *
     * @param \App\Entities\User $model
     *
     * @return array
     */
    public function transform(User $model)
    {
        return [
            'username'          => $model->username,
            'email'             => $model->email,
            'gender'            => [
                'id'            => $model->gender,
                'text' => $this->transformGender((int)$model->gender)
            ],
            'phone'             => $model->phone,
            'dob'               => $model->date_of_birth,
            'wpl'               => $model->working_place,
            'role'              => [
                'id'            => $model->hasRole->id,
                'text' => $model->hasRole->name,
            ],
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at,
            'uuid' => $model->uuid,
            'score' => $model->score,
            'rank' => $this->rank($model)
        ];
    }

    /**
     * @param int gender
     * @return string
     */
    protected function transformGender(int $gender)
    {
        if ($gender == 0) {
            return 'Male';
        } else if ($gender == 1) {
            return 'Female';
        } else {
            return 'Other';
        }
    }

    /**
     * @param User $model
     * @return array
     */
    private function rank(User $model)
    {
        $rank = Rank::where('min_score', '<=', $model->score)
            ->where('max_score', '>=', $model->score)
            ->first();
        if (empty($rank))
            return [
                'name' => 'No rank',
                'thumbnail' => ''
            ];
        else return [
            'name' => $rank->name,
            'thumbnail' => $rank->full_path,
        ];
    }
}
