<?php

namespace App\Presenters;

use App\Transformers\ScoreLogTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class ScoreLogPresenter.
 *
 * @package namespace App\Presenters;
 */
class ScoreLogPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new ScoreLogTransformer();
    }
}
