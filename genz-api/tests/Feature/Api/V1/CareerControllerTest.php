<?php

namespace Tests\Feature\Api\V1;

use App\Enums\EaseOfEmployment;
use App\Enums\EmploymentType;
use App\Enums\SelfEmployment;
use App\Models\Career;
use App\Models\CareerEmploymentType;
use App\Models\CareerIndustry;
use App\Models\Degree;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CareerControllerTest extends TestCase
{
    public function test_index_returns_careers_when_no_filters_applied(): void
    {
        // Act
        $response = $this->getJson('/api/v1/careers');

        // Assert
        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'slug',
                        'image',
                        'salary',
                        'satisfaction',
                        'industries',
                        'ease_of_employment',
                        'self_employment',
                        'employment_type',
                        'degrees',
                    ],
                ],
                'meta' => [
                    'current_page',
                    'from',
                    'last_page',
                    'per_page',
                    'to',
                    'total',
                ],
                'errors',
            ]);
    }

    public function test_index_filters_careers_by_name(): void
    {
        // Find an existing career to use for testing
        $career = Career::where('name', 'like', '%Software%')->first();
        
        if (!$career) {
            $this->markTestSkipped('No careers with "Software" in the name found in the database.');
        }
        
        // Act
        $response = $this->getJson('/api/v1/careers?name=Software');

        // Assert
        $response->assertStatus(200)
            ->assertJsonPath('success', true);
            
        // Check that results contain careers with "Software" in the name
        $responseData = $response->json('data');
        $this->assertNotEmpty($responseData);
        
        $foundMatchingName = false;
        foreach ($responseData as $item) {
            if (stripos($item['name'], 'Software') !== false) {
                $foundMatchingName = true;
                break;
            }
        }
        
        $this->assertTrue($foundMatchingName, 'No careers with "Software" in the name found in response');
    }

    public function test_index_filters_careers_by_industry(): void
    {
        // Find an existing industry to use for testing
        $industry = CareerIndustry::first();
        
        if (!$industry) {
            $this->markTestSkipped('No career industries found in the database.');
        }
        
        // Act
        $response = $this->getJson('/api/v1/careers?industry_ids[]=' . $industry->industry_id);

        // Assert
        $response->assertStatus(200)
            ->assertJsonPath('success', true);
            
        // Verify we have at least one result
        $responseData = $response->json('data');
        $this->assertNotEmpty($responseData);
    }

    public function test_index_filters_careers_by_employment_type(): void
    {
        // Find a career with employment_type
        $career = Career::whereHas('career_employment', function($q) {
            $q->whereNotNull('employment_type');
        })->first();
        
        if (!$career || !$career->career_employment || !$career->career_employment->employment_type) {
            $this->markTestSkipped('No careers with employment_type found.');
        }
        
        // Act
        $response = $this->getJson('/api/v1/careers?employment_type=' . $career->career_employment->employment_type);

        // Assert
        $response->assertStatus(200)
            ->assertJsonPath('success', true);
            
        // Verify we have at least one result
        $responseData = $response->json('data');
        $this->assertNotEmpty($responseData);
    }

    public function test_index_filters_careers_by_ease_of_employment(): void
    {
        // Find a career with ease_of_employment
        $career = Career::whereHas('career_employment', function($q) {
            $q->whereNotNull('ease_of_employment');
        })->first();
        
        if (!$career || !$career->career_employment || !$career->career_employment->ease_of_employment) {
            $this->markTestSkipped('No careers with ease_of_employment found.');
        }
        
        // Act
        $response = $this->getJson('/api/v1/careers?ease_of_employment=' . $career->career_employment->ease_of_employment);

        // Assert
        $response->assertStatus(200)
            ->assertJsonPath('success', true);
            
        // Verify we have at least one result
        $responseData = $response->json('data');
        $this->assertNotEmpty($responseData);
    }

    public function test_index_filters_careers_by_self_employment(): void
    {
        // Find a career with self_employment
        $career = Career::whereHas('career_employment', function($q) {
            $q->whereNotNull('self_employment');
        })->first();
        
        if (!$career || !$career->career_employment || !$career->career_employment->self_employment) {
            $this->markTestSkipped('No careers with self_employment found.');
        }
        
        // Act
        $response = $this->getJson('/api/v1/careers?self_employment=' . $career->career_employment->self_employment);

        // Assert
        $response->assertStatus(200)
            ->assertJsonPath('success', true);
            
        // Verify we have at least one result
        $responseData = $response->json('data');
        $this->assertNotEmpty($responseData);
    }

    public function test_index_filters_careers_by_degree(): void
    {
        // Find an existing degree to use for testing
        $degree = Degree::first();
        
        if (!$degree) {
            $this->markTestSkipped('No degrees found in the database.');
        }
        
        // Act
        $response = $this->getJson('/api/v1/careers?degree_ids[]=' . $degree->degree_id);

        // Assert
        $response->assertStatus(200)
            ->assertJsonPath('success', true);
    }

    public function test_index_returns_empty_data_array_when_no_careers_match_filter(): void
    {
        // Use a search term that's unlikely to match any existing career
        $response = $this->getJson('/api/v1/careers?name=XYZNonExistentCareerNameABC123');

        // Assert
        $response->assertStatus(200)
            ->assertJsonCount(0, 'data')
            ->assertJsonPath('success', true);
    }

    public function test_filter_options_returns_expected_structure(): void
    {
        // Act
        $response = $this->getJson('/api/v1/careers/filter-options');

        // Assert
        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'industries' => [
                        '*' => [
                            'id',
                            'name',
                        ],
                    ],
                    'ease_of_employment',
                    'self_employment',
                    'employment_type',
                    'degrees' => [
                        '*' => [
                            'id',
                            'name',
                        ],
                    ],
                ],
                'meta',
                'errors',
            ]);
        
        // Check if ease_of_employment options are correctly included
        $response->assertJsonCount(count(EaseOfEmployment::cases()), 'data.ease_of_employment');
        
        // Check if self-employment options are correctly included
        $response->assertJsonCount(count(SelfEmployment::cases()), 'data.self_employment');
        
        // Check if employment_type options are correctly included
        $response->assertJsonCount(count(EmploymentType::cases()), 'data.employment_type');
    }
} 