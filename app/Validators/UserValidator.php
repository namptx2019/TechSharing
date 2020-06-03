<?php

namespace App\Validators;

use \Prettus\Validator\Contracts\ValidatorInterface;
use \Prettus\Validator\LaravelValidator;

/**
 * Class UserValidator.
 *
 * @package namespace App\Validators;
 */
class UserValidator extends LaravelValidator
{
    const RULE_STORE_STEP_1 = 'step-1';
    const RULE_STORE_STEP_2 = 'step-2';
    const RULE_STORE_FINISH = 'finish';
    /**
     * Validation Rules
     *
     * @var array
     */
    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'username'          => 'required|max:255|regex:/^\S*$/u|unique:users|min:6',
            'email'             => 'required|email|max:255|unique:users',
            'password'          => 'required|min:8',
            'confirm_password'  => 'required|same:password|min:8',
            'gender'            => 'required|integer',
            'phone'             => 'nullable',
            'date_of_birth'     => 'required|date_format:Y-m-d',
            'working_place'     => 'nullable',
            'facebook'          => 'nullable',
            'skype'             => 'nullable',
            'twitter'           => 'nullable',
            'linkedin'          => 'nullable',
            'entry'             => 'nullable',
            'ip_last'           => 'nullable',
            'location'          => 'nullable',
            'country'           => 'nullable|max:255',
            'avatar'            => 'sometimes|max:2048',
        ],
        ValidatorInterface::RULE_UPDATE => [
            'username'          => 'sometimes|max:255|regex:/^\S*$/u|unique:users|min:6',
            'password'          => 'nullable|min:8',
            'confirm_password'  => 'nullable|same:password|min:8',
            'gender'            => 'integer',
            'phone'             => 'nullable',
            'date_of_birth'     => 'date_format:Y-m-d',
            'working_place'     => 'nullable',
            'facebook'          => 'nullable',
            'skype'             => 'nullable',
            'twitter'           => 'nullable',
            'linkedin'          => 'nullable',
            'entry'             => 'nullable',
            'ip_last'           => 'nullable',
            'location'          => 'nullable',
            'country'           => 'nullable|max:255',
            'settings.*'        => 'required|integer|min:0',
            'avatar'            => 'sometimes|max:2048',
        ],
        self::RULE_STORE_STEP_1 => [
            'username'          => 'required|max:255|regex:/^\S*$/u|unique:users|min:6',
            'email'             => 'required|email|max:255|unique:users',
            'password'          => 'required|min:8',
            'confirm_password'  => 'required|same:password|min:8',
        ],
        self::RULE_STORE_STEP_2 => [
            'gender'            => 'required|integer',
            'phone'             => 'nullable',
            'date_of_birth'     => 'required|date_format:Y-m-d',
        ],
        self::RULE_STORE_FINISH => [
            'avatar'            => 'file|image|max:2048'
        ]
    ];
}
