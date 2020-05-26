<?php

namespace App\Presenters;

use App\Transformers\UserAvatarTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class UserAvatarPresenter.
 *
 * @package namespace App\Presenters;
 */
class UserAvatarPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new UserAvatarTransformer();
    }
}
