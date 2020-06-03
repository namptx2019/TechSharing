<?php

namespace App\Presenters;

use App\Transformers\RankTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class RankPresenter.
 *
 * @package namespace App\Presenters;
 */
class RankPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new RankTransformer();
    }
}
