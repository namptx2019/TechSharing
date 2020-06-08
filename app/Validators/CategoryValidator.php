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
            'parent_id'     => 'nullable|integer'
        ],
        ValidatorInterface::RULE_UPDATE => [
            'name'          => 'max:255',
            'parent_id'     => 'integer',
            'header'        => 'integer',
        ],
    ];
}
