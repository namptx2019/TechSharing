<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

/**
 * Class RankValidator.
 *
 * @package namespace App\Validators;
 */
class RankValidator extends LaravelValidator
{
    /**
     * Validation Rules
     *
     * @var array
     */
    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'name' => 'required|max:255',
            'medal' => 'required|file|image|dimensions:max_height=512,max_width=512|max:2048',
            'min_score' => 'required|integer|min:0',
            'max_score' => 'required|integer|min:0'
        ],
        ValidatorInterface::RULE_UPDATE => [
            'name' => 'required|max:255',
            'medal' => 'file|image|dimensions:max_height=512,max_width=512|max:2048',
            'min_score' => 'required|integer|min:0',
            'max_score' => 'required|integer|min:0'
        ],
    ];
}
