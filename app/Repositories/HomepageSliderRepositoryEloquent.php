<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\HomepageSliderRepository;
use App\Entities\HomepageSlider;
use App\Validators\HomepageSliderValidator;

/**
 * Class HomepageSliderRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class HomepageSliderRepositoryEloquent extends BaseRepository implements HomepageSliderRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return HomepageSlider::class;
    }

    /**
    * Specify Validator class name
    *
    * @return mixed
    */
    public function validator()
    {

        return HomepageSliderValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
    
}
