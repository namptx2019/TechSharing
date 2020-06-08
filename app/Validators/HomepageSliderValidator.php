<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

/**
 * Class HomepageSliderValidator.
 *
 * @package namespace App\Validators;
 */
class HomepageSliderValidator extends LaravelValidator
{
    /**
     * Validation Rules
     *
     * @var array
     */
    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'title'     => 'required|string|max:255',
            'image'     => 'required|file|image|max:2048',
            'link'      => 'nullable|string',
            'desc'      => 'required|string',
            'status'    => 'required|integer',
        ],
        ValidatorInterface::RULE_UPDATE => [
            'title'     => 'string|max:255',
            'image'     => 'sometimes|file|image|max:2048',
            'link'      => 'nullable|string',
            'desc'      => 'string',
            'status'    => 'integer',
        ],
    ];
}
