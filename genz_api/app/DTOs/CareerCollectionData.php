<?php

declare(strict_types=1);

namespace App\DTOs;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class CareerCollectionData implements Arrayable, \JsonSerializable
{
    /**
     * @param Collection<CareerData> $careers
     * @param array|null $meta
     */
    public function __construct(
        public readonly Collection $careers,
        public readonly ?array $meta = null,
    ) {}

    public static function fromModels(Collection $careers): self
    {
        return new self(
            careers: $careers->map(fn($career) => CareerData::fromModel($career)),
        );
    }

    public static function fromPaginator(LengthAwarePaginator $paginator): self
    {
        return new self(
            careers: $paginator->getCollection()->map(fn($career) => CareerData::fromModel($career)),
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
            'careers' => $this->careers->toArray(),
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
            'data' => $this->careers->toArray(),
            'meta' => $this->meta,
            'errors' => null,
        ];
    }
} 