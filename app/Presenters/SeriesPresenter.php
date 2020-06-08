<?php

namespace App\Presenters;

use App\Transformers\SeriesTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class SeriesPresenter.
 *
 * @package namespace App\Presenters;
 */
class SeriesPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new SeriesTransformer();
    }
}
