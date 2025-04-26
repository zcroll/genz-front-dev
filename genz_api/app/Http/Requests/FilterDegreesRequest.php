<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterDegreesRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'area_names' => ['sometimes', 'nullable', 'array'],
            'area_names.*' => ['string'],
            'area_codes' => ['sometimes', 'nullable', 'array'],
            'area_codes.*' => ['string'],
            'degree_level' => ['sometimes', 'nullable', 'integer', 'min:1', 'max:5'],
            'per_page' => ['sometimes', 'nullable', 'integer', 'min:1', 'max:100'],
            'page' => ['sometimes', 'nullable', 'integer', 'min:1'],
            'sort' => ['sometimes', 'nullable', 'string', 'in:name,-name,salary,-salary,satisfaction_raw,-satisfaction_raw,degree_level,-degree_level'],
        ];
    }
} 