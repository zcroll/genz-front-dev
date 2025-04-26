<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Enums\EaseOfEmployment;
use App\Enums\EmploymentType;
use App\Enums\SelfEmployment;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FilterCareersRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'industry_ids' => ['sometimes', 'nullable', 'array'],
            'industry_ids.*' => ['integer', 'exists:career_industries,industry_id'],
            'ease_of_employment' => ['sometimes', 'nullable', 'string', Rule::in(EaseOfEmployment::values())],
            'self_employment' => ['sometimes', 'nullable', 'string', Rule::in(SelfEmployment::values())],
            'employment_type' => ['sometimes', 'nullable', 'string', Rule::in(EmploymentType::values())],
            'degree_ids' => ['sometimes', 'nullable', 'array'],
            'degree_ids.*' => ['integer', 'exists:degrees,degree_id'],
            'per_page' => ['sometimes', 'nullable', 'integer', 'min:1', 'max:100'],
            'page' => ['sometimes', 'nullable', 'integer', 'min:1'],
            'sort' => ['sometimes', 'nullable', 'string', 'in:name,-name,salary,-salary,satisfaction_raw,-satisfaction_raw'],
        ];
    }
} 