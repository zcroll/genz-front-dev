<?php

declare(strict_types=1);

namespace App\DTOs;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class DegreeCollectionData implements Arrayable, \JsonSerializable
{
    /**
     * @param Collection<DegreeData> $degrees
     * @param array|null $meta
     */
    public function __construct(
        public readonly Collection $degrees,
        public readonly ?array $meta = null,
    ) {}

    public static function fromModels(Collection $degrees): self
    {
        return new self(
            degrees: $degrees->map(fn($degree) => DegreeData::fromModel($degree)),
        );
    }

    public static function fromPaginator(LengthAwarePaginator $paginator): self
    {
        return new self(
            degrees: $paginator->getCollection()->map(fn($degree) => DegreeData::fromModel($degree)),
            meta: [
                'current_page' => $paginator->currentPage(),
                'from' => $paginator->firstItem(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'to' => $paginator->lastItem(),
                'total' => $paginator->total(),
            ],
        );
    }

    public function toArray(): array
    {
        return [
            'degrees' => $this->degrees->toArray(),
            'meta' => $this->meta,
        ];
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }

    public function toResponse(): array
    {
        return [
            'success' => true,
            'data' => $this->degrees->toArray(),
            'meta' => $this->meta,
            'errors' => null,
        ];
    }
} 