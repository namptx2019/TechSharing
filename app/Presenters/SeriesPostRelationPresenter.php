<?php

namespace App\Presenters;

use App\Transformers\SeriesPostRelationTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class SeriesPostRelationPresenter.
 *
 * @package namespace App\Presenters;
 */
class SeriesPostRelationPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new SeriesPostRelationTransformer();
    }
}
