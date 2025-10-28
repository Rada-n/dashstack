<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
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
            'password' => ['required', 'string', 'min:4', 'max:50'],
        ];
    }

    public function messages(): array
        {
            return [
                'email.required' => 'Поле Email обязательно для заполнения.',
                'email.email' => 'Некорректный формат Email.',
                'password.required' => 'Поле Password обязательно для заполнения.',
            ];
        }
}
