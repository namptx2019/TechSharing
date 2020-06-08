<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\SeriesPostRelationRepository;
use App\Entities\SeriesPostRelation;
use App\Validators\SeriesPostRelationValidator;

/**
 * Class SeriesPostRelationRepositoryEloquent.
 *
 * @package namespace App\Repositories;
 */
class SeriesPostRelationRepositoryEloquent extends BaseRepository implements SeriesPostRelationRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return SeriesPostRelation::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

}
