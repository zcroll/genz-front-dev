<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Actions\Career\FilterCareers;
use App\DTOs\CareerFilterData;
use App\Enums\EaseOfEmployment;
use App\Enums\EmploymentType;
use App\Enums\SelfEmployment;
use App\Http\Controllers\Controller;
use App\Http\Requests\FilterCareersRequest;
use App\Models\CareerIndustry;
use App\Models\Degree;
use Illuminate\Http\JsonResponse;

class CareerController extends Controller
{
    public function __construct(
        private FilterCareers $filter_careers,
    ) {}

    public function index(FilterCareersRequest $request): JsonResponse
    {
        $filter_data = CareerFilterData::fromRequest($request);
        $result = $this->filter_careers->execute($filter_data, $request->input('per_page', 15));

        return response()->json($result->toResponse());
    }

    public function filterOptions(): JsonResponse
    {
        // Get unique industry options
        $industries = CareerIndustry::select('industry_id', 'industry_name')
            ->distinct('industry_id')
            ->orderBy('industry_name')
            ->get()
            ->map(fn($industry) => [
                'id' => $industry->industry_id,
                'name' => $industry->industry_name,
            ]);

        // Get degrees
        $degrees = Degree::select('degree_id', 'name')
            ->orderBy('name')
            ->get()
            ->map(fn($degree) => [
                'id' => $degree->degree_id,
                'name' => $degree->name,
            ]);

        return response()->json([
            'success' => true,
            'data' => [
                'industries' => $industries,
                'ease_of_employment' => EaseOfEmployment::options(),
                'self_employment' => SelfEmployment::options(),
                'employment_type' => EmploymentType::options(),
                'degrees' => $degrees,
            ],
            'meta' => null,
            'errors' => null,
        ]);
    }
} 