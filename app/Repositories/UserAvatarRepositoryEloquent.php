<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\UserAvatarRepository;
use App\Entities\UserAvatar;
use App\Validators\UserAvatarValidator;

/**
 * Class UserAvatarRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class UserAvatarRepositoryEloquent extends BaseRepository implements UserAvatarRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return UserAvatar::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return UserAvatarValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
}
