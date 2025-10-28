<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CalendarRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string', 'max:200'],
            'address' => ['required', 'string', 'max:60'],
           'date' => ['nullable', 'date'],
        'first_date' => ['nullable', 'date'],
        'last_date' => ['nullable', 'date'],
        'image_url' => ['nullable'],
        ];
    }
}
