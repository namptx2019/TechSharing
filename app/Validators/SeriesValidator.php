<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

/**
 * Class SeriesValidator.
 *
 * @package namespace App\Validators;
 */
class SeriesValidator extends LaravelValidator
{
    /**
     * Validation Rules
     *
     * @var array
     */
    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'name'          => 'required|max:255',
            'desc'          => 'required',
            'poster'        => 'required|file|image|dimensions:max_width=2048,max_height=2048|max:2048',
            'category_id'   => 'required|integer',
            'status'        => 'required|integer'
        ],
        ValidatorInterface::RULE_UPDATE => [
            'name'          => 'max:255',
            'poster'        => 'file|image|dimensions:max_width=2048,max_height=2048|max:2048',
            'category_id'   => 'integer',
            'status'        => 'integer'
        ],
    ];
}
