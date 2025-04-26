<?php

declare(strict_types=1);

namespace App\DTOs;

use App\Models\Career;
use Illuminate\Contracts\Support\Arrayable;

class CareerData implements Arrayable, \JsonSerializable
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $slug,
        public readonly ?string $image,
        public readonly ?float $salary,
        public readonly ?string $satisfaction,
        public readonly ?array $industries = null,
        public readonly ?string $ease_of_employment = null,
        public readonly ?string $self_employment = null,
        public readonly ?string $employment_type = null,
        public readonly ?array $degrees = null,
    ) {}

    public static function fromModel(Career $career): self
    {
        return new self(
            id: $career->id,
            name: $career->name ?? '',
            slug: $career->slug ?? '',
            image: $career->image,
            salary: $career->salary,
            satisfaction: $career->satisfaction,
            industries: $career->career_industries->pluck('industry_name')->toArray(),
            ease_of_employment: $career->career_employment?->ease_of_employment,
            self_employment: $career->career_employment?->self_employment,
            employment_type: $career->career_employment?->employment_type,
            degrees: $career->degrees->pluck('name')->toArray(),
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'image' => $this->image,
            'salary' => $this->salary,
            'satisfaction' => $this->satisfaction,
            'industries' => $this->industries,
            'ease_of_employment' => $this->ease_of_employment,
            'self_employment' => $this->self_employment,
            'employment_type' => $this->employment_type,
            'degrees' => $this->degrees,
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