<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

/**
 * Class PostValidator.
 *
 * @package namespace App\Validators;
 */
class PostValidator extends LaravelValidator
{
    /**
     * Validation Rules
     *
     * @var array
     */
    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'name'          => 'required|max:255',
            'desc'          => 'required|max:255',
            'thumbnail'     => 'required|file|image|dimensions:max_width=2048,max_height=2048|max:2048',
            'category_id'   => 'required|integer',
            'content'       => 'required',
            'language_id'   => 'required|integer',
            'status'        => 'required|integer'
        ],
        ValidatorInterface::RULE_UPDATE => [
            'name'          => 'max:255',
            'desc'          => 'max:255',
            'thumbnail'     => 'file|image|dimensions:max_width=2048,max_height=2048|max:2048',
            'category_id'   => 'integer',
            'language_id'   => 'integer',
            'status'        => 'integer'
        ],
    ];
}
