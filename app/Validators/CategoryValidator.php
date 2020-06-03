<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

/**
 * Class CategoryValidator.
 *
 * @package namespace App\Validators;
 */
class CategoryValidator extends LaravelValidator
{
    /**
     * Validation Rules
     *
     * @var array
     */
    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'name'          => 'required|max:255',
            'thumbnail'     => 'required|file|image|dimensions:max_height=2048,max_width=2048|max:2048',
            'parent_id'     => 'nullable|integer'
        ],
        ValidatorInterface::RULE_UPDATE => [
            'name'          => 'max:255',
            'thumbnail'     => 'file|image|dimensions:max_height=2048,max_width=2048|max:2048',
            'parent_id'     => 'integer',
            'header'        => 'integer',
        ],
    ];
}
