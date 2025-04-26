<?php

declare(strict_types=1);

namespace App\DTOs;

use Illuminate\Contracts\Support\Arrayable;
use InvalidArgumentException;

class DegreeFilterData implements Arrayable, \JsonSerializable
{
    public function __construct(
        public readonly ?string $name = null,
        public readonly ?array $area_names = null,
        public readonly ?array $area_codes = null,
        public readonly ?int $degree_level = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'] ?? null,
            area_names: $data['area_names'] ?? null,
            area_codes: $data['area_codes'] ?? null,
            degree_level: isset($data['degree_level']) ? (int)$data['degree_level'] : null,
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
            'area_names' => $this->area_names,
            'area_codes' => $this->area_codes,
            'degree_level' => $this->degree_level,
        ];
    }

    public function jsonSerialize(): array
    {
        return $this->toArray();
    }
} 