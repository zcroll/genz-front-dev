<?php

namespace Tests\Unit\DTOs;

use App\DTOs\CareerFilterData;
use Illuminate\Http\Request;
use Mockery;
use Tests\TestCase;

class CareerFilterDataTest extends TestCase
{
    public function test_creates_from_array(): void
    {
        // Arrange
        $data = [
            'name' => 'Software Developer',
            'industry_ids' => [1, 2],
            'employment_types' => ['full_time', 'contract'],
            'self_employment' => 'yes',
            'degree_ids' => [3, 4],
        ];

        // Act
        $dto = CareerFilterData::fromArray($data);

        // Assert
        $this->assertEquals('Software Developer', $dto->name);
        $this->assertEquals([1, 2], $dto->industry_ids);
        $this->assertEquals(['full_time', 'contract'], $dto->employment_types);
        $this->assertEquals('yes', $dto->self_employment);
        $this->assertEquals([3, 4], $dto->degree_ids);
    }

    public function test_creates_from_array_with_partial_data(): void
    {
        // Arrange
        $data = [
            'name' => 'Software Developer',
        ];

        // Act
        $dto = CareerFilterData::fromArray($data);

        // Assert
        $this->assertEquals('Software Developer', $dto->name);
        $this->assertNull($dto->industry_ids);
        $this->assertNull($dto->employment_types);
        $this->assertNull($dto->self_employment);
        $this->assertNull($dto->degree_ids);
    }

    public function test_creates_from_array_with_empty_data(): void
    {
        // Arrange
        $data = [];

        // Act
        $dto = CareerFilterData::fromArray($data);

        // Assert
        $this->assertNull($dto->name);
        $this->assertNull($dto->industry_ids);
        $this->assertNull($dto->employment_types);
        $this->assertNull($dto->self_employment);
        $this->assertNull($dto->degree_ids);
    }

    public function test_creates_from_request(): void
    {
        // Arrange
        $request = Mockery::mock(Request::class);
        $request->shouldReceive('validated')
            ->once()
            ->andReturn([
                'name' => 'Software Developer',
                'industry_ids' => [1, 2],
                'employment_types' => ['full_time', 'contract'],
                'self_employment' => 'yes',
                'degree_ids' => [3, 4],
            ]);

        // Act
        $dto = CareerFilterData::fromRequest($request);

        // Assert
        $this->assertEquals('Software Developer', $dto->name);
        $this->assertEquals([1, 2], $dto->industry_ids);
        $this->assertEquals(['full_time', 'contract'], $dto->employment_types);
        $this->assertEquals('yes', $dto->self_employment);
        $this->assertEquals([3, 4], $dto->degree_ids);
    }

    public function test_converts_to_array(): void
    {
        // Arrange
        $dto = new CareerFilterData(
            name: 'Software Developer',
            industry_ids: [1, 2],
            employment_types: ['full_time', 'contract'],
            self_employment: 'yes',
            degree_ids: [3, 4]
        );

        // Act
        $array = $dto->toArray();

        // Assert
        $this->assertEquals([
            'name' => 'Software Developer',
            'industry_ids' => [1, 2],
            'employment_types' => ['full_time', 'contract'],
            'self_employment' => 'yes',
            'degree_ids' => [3, 4],
        ], $array);
    }

    public function test_json_serializes(): void
    {
        // Arrange
        $dto = new CareerFilterData(
            name: 'Software Developer',
            industry_ids: [1, 2],
            employment_types: ['full_time', 'contract'],
            self_employment: 'yes',
            degree_ids: [3, 4]
        );

        // Act
        $json = json_encode($dto);
        $decoded = json_decode($json, true);

        // Assert
        $this->assertEquals([
            'name' => 'Software Developer',
            'industry_ids' => [1, 2],
            'employment_types' => ['full_time', 'contract'],
            'self_employment' => 'yes',
            'degree_ids' => [3, 4],
        ], $decoded);
    }
} 