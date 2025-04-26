<?php

declare(strict_types=1);

namespace App\Actions\Career;

use App\DTOs\CareerCollectionData;
use App\DTOs\CareerFilterData;
use App\Models\Career;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class FilterCareers
{
    public function execute(CareerFilterData $filter_data, int $per_page = 15): CareerCollectionData
    {
        $query = QueryBuilder::for(Career::class)
            ->allowedFilters([
                AllowedFilter::partial('name'),
                AllowedFilter::exact('career_industries.industry_id', 'industry_ids'),
                AllowedFilter::exact('career_employment.ease_of_employment', 'ease_of_employment'),
                AllowedFilter::exact('career_employment.self_employment', 'self_employment'),
                AllowedFilter::exact('career_employment.employment_type', 'employment_type'),
                AllowedFilter::exact('degrees.degree_id', 'degree_ids'),
            ])
            ->allowedSorts(['name', 'salary', 'satisfaction_raw'])
            ->allowedIncludes(['career_industries', 'career_employment', 'degrees'])
            ->with(['career_industries', 'career_employment', 'degrees']);

        // Apply manual filters that cannot be handled by QueryBuilder
        if ($filter_data->name) {
            $query->where('name', 'like', "%{$filter_data->name}%");
        }

        if ($filter_data->industry_ids) {
            $query->whereHas('career_industries', function ($q) use ($filter_data) {
                $q->whereIn('industry_id', $filter_data->industry_ids);
            });
        }
        
        if ($filter_data->ease_of_employment) {
            $query->whereHas('career_employment', function ($q) use ($filter_data) {
                $q->where('ease_of_employment', $filter_data->ease_of_employment);
            });
        }

        if ($filter_data->self_employment) {
            $query->whereHas('career_employment', function ($q) use ($filter_data) {
                $q->where('self_employment', $filter_data->self_employment);
            });
        }
        
        if ($filter_data->employment_type) {
            $query->whereHas('career_employment', function ($q) use ($filter_data) {
                $q->where('employment_type', $filter_data->employment_type);
            });
        }

        if ($filter_data->degree_ids) {
            $query->whereHas('degrees', function ($q) use ($filter_data) {
                $q->whereIn('degrees.degree_id', $filter_data->degree_ids);
            });
        }

        /** @var LengthAwarePaginator $paginator */
        $paginator = $query->paginate($per_page);

        return CareerCollectionData::fromPaginator($paginator);
    }

    public function __invoke(CareerFilterData $filter_data, int $per_page = 15): CareerCollectionData
    {
        return $this->execute($filter_data, $per_page);
    }
} 