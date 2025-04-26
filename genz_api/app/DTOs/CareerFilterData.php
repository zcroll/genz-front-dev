<?php

declare(strict_types=1);

namespace App\DTOs;

use Illuminate\Contracts\Support\Arrayable;
use InvalidArgumentException;

class CareerFilterData implements Arrayable, \JsonSerializable
{
    public function __construct(
        public readonly ?string $name = null,
        public readonly ?array $industry_ids = null,
        public readonly ?string $ease_of_employment = null,
        public readonly ?string $self_employment = null,
        public readonly ?string $employment_type = null,
        public readonly ?array $degree_ids = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'] ?? null,
            industry_ids: $data['industry_ids'] ?? null,
            ease_of_employment: $data['ease_of_employment'] ?? null,
            self_employment: $data['self_employment'] ?? null,
            employment_type: $data['employment_type'] ?? null,
            degree_ids: $data['degree_ids'] ?? null,
        );
    }

    public static function fromRequest(\Illuminate\Http\Request $request): self
    {
        return self::fromArray($request->validated());
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'industry_ids' => $this->industry_ids,
            'ease_of_employment' => $this->ease_of_employment,
            'self_employment' => $this->self_employment,
            'employment_type' => $this->employment_type,
            'degree_ids' => $this->degree_ids,
        ];
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
} 