<?php

namespace Tests\Feature\Api\V1;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DegreeControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Create a user for authentication
        $this->user = User::factory()->create();
    }

    /** @test */
    public function it_returns_all_degrees_when_no_filters_applied()
    {
        $response = $this->actingAs($this->user)
            ->getJson('/api/v1/degrees');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'degree_id',
                        'name',
                        'slug',
                        'degree_level',
                        'salary',
                        'satisfaction',
                        'image_url',
                        'areas',
                    ]
                ],
                'meta',
                'errors',
            ])
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data');
    }

    /** @test */
    public function it_returns_degrees_filtered_by_name()
    {
        $response = $this->actingAs($this->user)
            ->getJson('/api/v1/degrees?filter[name]=Computer');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.0.name', 'Computer Science');
    }

    /** @test */
    public function it_returns_degrees_filtered_by_degree_level()
    {
        $response = $this->actingAs($this->user)
            ->getJson('/api/v1/degrees?filter[degree_level]=3');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonCount(2, 'data'); // Both mock degrees have level 3
    }

    /** @test */
    public function it_returns_filter_options()
    {
        $response = $this->actingAs($this->user)
            ->getJson('/api/v1/degrees/filter-options');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'areas' => [
                        '*' => ['name']
                    ],
                    'degree_levels' => [
                        '*' => ['id', 'name']
                    ]
                ],
                'meta',
                'errors',
            ])
            ->assertJsonPath('success', true);
    }

    /** @test */
    public function it_requires_authentication()
    {
        $response = $this->getJson('/api/v1/degrees');
        
        $response->assertStatus(401);
    }
} 