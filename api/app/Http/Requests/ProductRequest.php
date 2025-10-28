<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'name' => ['sometimes', 'string', 'max:100', 'min:3'],
            'price' => ['sometimes', 'min:1'],
            'image' => ['nullable'],
            'category' => ['sometimes', 'string', 'max:100', 'min:3'],
            'rating' => ['sometimes', 'integer', 'min:1', 'max:5'],
            'reviews' => ['sometimes', 'integer', 'min:0', 'max:1000'],
        ];
    }
}
