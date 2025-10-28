<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'min:4'],
            'name' => ['required', 'string', 'min:2', 'max:100'],
            'password' => ['required', 'string', 'min:4', 'max:50'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Поле Email обязательно для заполнения.',
            'email.email' => 'Некорректный формат Email.',
            'email.min' => 'Email должен содержать минимум 4 символа.',
            'name.required' => 'Поле Username обязательно для заполнения.',
            'name.min' => 'Username должен содержать минимум 2 символа.',
            'name.max' => 'Username не должен превышать 100 символов.',
            'password.required' => 'Поле Password обязательно для заполнения.',
            'password.min' => 'Password должен содержать минимум 4 символа.',
            'password.max' => 'Password не должен превышать 50 символов.',
        ];
    }

}
