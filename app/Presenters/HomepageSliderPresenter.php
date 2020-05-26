<?php

namespace App\Presenters;

use App\Transformers\HomepageSliderTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class HomepageSliderPresenter.
 *
 * @package namespace App\Presenters;
 */
class HomepageSliderPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new HomepageSliderTransformer();
    }
}
