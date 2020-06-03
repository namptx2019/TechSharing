<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\ScoreLogRepository;
use App\Entities\ScoreLog;
use App\Validators\ScoreLogValidator;

/**
 * Class ScoreLogRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class ScoreLogRepositoryEloquent extends BaseRepository implements ScoreLogRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ScoreLog::class;
    }

    /**
     * Specify Validator class name
     *
     * @return mixed
     */
    public function validator()
    {

        return ScoreLogValidator::class;
    }


    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

}
