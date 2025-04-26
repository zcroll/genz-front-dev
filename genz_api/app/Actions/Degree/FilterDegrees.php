<?php

declare(strict_types=1);

namespace App\Actions\Degree;

use App\DTOs\DegreeCollectionData;
use App\DTOs\DegreeFilterData;
use App\Models\Degree;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class FilterDegrees
{
    public function execute(DegreeFilterData $filter_data, int $per_page = 15): DegreeCollectionData
    {
        $query = QueryBuilder::for(Degree::class)
            ->allowedFilters([
                AllowedFilter::partial('name'),
                AllowedFilter::exact('degree_areas.area_name', 'area_names'),
                AllowedFilter::exact('degree_areas.area_code', 'area_codes'),
                AllowedFilter::exact('degree_level'),
            ])
            ->allowedSorts(['name', 'salary', 'satisfaction_raw', 'degree_level'])
            ->allowedIncludes(['degree_areas'])
            ->with(['degree_areas']);

        // Apply manual filters that cannot be handled by QueryBuilder
        if ($filter_data->name) {
            $query->where('name', 'like', "%{$filter_data->name}%");
        }

        if ($filter_data->area_names) {
            $query->whereHas('degree_areas', function ($q) use ($filter_data) {
                $q->whereIn('degree_areas.area_name', $filter_data->area_names);
            });
        }

        if ($filter_data->area_codes) {
            $query->whereHas('degree_areas', function ($q) use ($filter_data) {
                $q->whereIn('degree_areas.area_code', $filter_data->area_codes);
            });
        }

        if ($filter_data->degree_level) {
            $query->where('degree_level', $filter_data->degree_level);
        }

        /** @var LengthAwarePaginator $paginator */
        $paginator = $query->paginate($per_page);

        return DegreeCollectionData::fromPaginator($paginator);
    }

    public function __invoke(DegreeFilterData $filter_data, int $per_page = 15): DegreeCollectionData
    {
        return $this->execute($filter_data, $per_page);
    }
} 