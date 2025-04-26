<?php

declare(strict_types=1);

namespace App\DTOs;

use App\Models\Degree;
use Illuminate\Contracts\Support\Arrayable;

class DegreeData implements Arrayable, \JsonSerializable
{
    public function __construct(
        public readonly int $degree_id,
        public readonly string $name,
        public readonly string $slug,
        public readonly int $degree_level,
        public readonly ?float $salary,
        public readonly ?string $satisfaction,
        public readonly ?string $image_url,
        public readonly ?array $areas = null,
    ) {}

    public static function fromModel(Degree $degree): self
    {
        return new self(
            degree_id: $degree->degree_id,
            name: $degree->name,
            slug: $degree->slug,
            degree_level: $degree->degree_level,
            salary: $degree->salary,
            satisfaction: $degree->satisfaction,
            image_url: $degree->image_url,
            areas: $degree->degree_areas->pluck('area_name')->toArray(),
        );
    }

    public function toArray(): array
    {
        return [
            'degree_id' => $this->degree_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'degree_level' => $this->degree_level,
            'salary' => $this->salary,
            'satisfaction' => $this->satisfaction,
            'image_url' => $this->image_url,
            'areas' => $this->areas,
        ];
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }

    public function toResponse(): array
    {
        return [
            'data' => $this->toArray(),
        ];
    }
} 