<?php

namespace Tests\Feature\Actions\Career;

use App\Actions\Career\FilterCareers;
use App\DTOs\CareerFilterData;
use App\Models\Career;
use App\Models\CareerEmploymentType;
use App\Models\CareerIndustry;
use App\Models\Degree;
use Tests\TestCase;

class FilterCareersTest extends TestCase
{
    private FilterCareers $filter_careers;

    protected function setUp(): void
    {
        parent::setUp();
        $this->filter_careers = new FilterCareers();
    }

    public function test_filters_careers_by_name(): void
    {
        // Find an existing career with a name that contains "Software"
        $career = Career::where('name', 'like', '%Software%')->first();
        
        if (!$career) {
            $this->markTestSkipped('No careers with "Software" in the name found in the database.');
        }
        
        // Act
        $filter_data = new CareerFilterData(name: 'Software');
        $result = $this->filter_careers->execute($filter_data);

        // Assert
        $this->assertGreaterThanOrEqual(1, $result->careers->count());
        
        // Check that at least one career with "Software" in the name exists in the results
        $foundMatchingName = false;
        foreach ($result->careers as $careerResult) {
            if (stripos($careerResult->name, 'Software') !== false) {
                $foundMatchingName = true;
                break;
            }
        }
        
        $this->assertTrue($foundMatchingName, 'Expected to find a career with "Software" in the name in the results');
    }

    public function test_filters_careers_by_industry(): void
    {
        // Find an existing industry
        $industry = CareerIndustry::first();
        
        if (!$industry) {
            $this->markTestSkipped('No career industries found in the database.');
        }
        
        // Act
        $filter_data = new CareerFilterData(industry_ids: [$industry->industry_id]);
        $result = $this->filter_careers->execute($filter_data);

        // Assert
        $this->assertNotEmpty($result->careers);
    }

    public function test_filters_careers_by_employment_type(): void
    {
        // Find an existing employment type
        $career = Career::whereHas('career_employment', function($q) {
            $q->whereNotNull('employment_type');
        })->first();
        
        if (!$career || !$career->career_employment || !$career->career_employment->employment_type) {
            $this->markTestSkipped('No careers with employment type found in the database.');
        }
        
        // Act
        $filter_data = new CareerFilterData(employment_types: [$career->career_employment->employment_type]);
        $result = $this->filter_careers->execute($filter_data);

        // Assert
        $this->assertNotEmpty($result->careers);
        
        // Check if the original career is in the results
        $foundOriginalCareer = false;
        foreach ($result->careers as $careerResult) {
            if ($careerResult->id === $career->id) {
                $foundOriginalCareer = true;
                break;
            }
        }
        
        $this->assertTrue($foundOriginalCareer, 'Expected to find the original career with matching employment type in the results');
    }

    public function test_filters_careers_by_degree(): void
    {
        // Find a career with associated degrees
        $career = Career::whereHas('degrees')->first();
        
        if (!$career) {
            $this->markTestSkipped('No careers with associated degrees found in the database.');
        }
        
        // Get one of the degrees associated with this career
        $degree = $career->degrees->first();
        
        // Act
        $filter_data = new CareerFilterData(degree_ids: [$degree->degree_id]);
        $result = $this->filter_careers->execute($filter_data);

        // Assert
        $this->assertNotEmpty($result->careers);
        
        // Check if the original career is in the results
        $foundOriginalCareer = false;
        foreach ($result->careers as $careerResult) {
            if ($careerResult->id === $career->id) {
                $foundOriginalCareer = true;
                break;
            }
        }
        
        $this->assertTrue($foundOriginalCareer, 'Expected to find the original career in the filtered results');
    }

    public function test_returns_all_careers_when_no_filters_applied(): void
    {
        // Get count of all careers to compare
        $totalCareersCount = Career::count();
        
        if ($totalCareersCount === 0) {
            $this->markTestSkipped('No careers found in the database.');
        }
        
        // Act
        $filter_data = new CareerFilterData();
        $result = $this->filter_careers->execute($filter_data);

        // Assert - with pagination, we should get up to the per_page limit, not necessarily all careers
        $this->assertGreaterThan(0, $result->careers->count());
        
        // If total careers is less than default per_page (15), then the count should match
        if ($totalCareersCount <= 15) {
            $this->assertEquals($totalCareersCount, $result->careers->count());
        }
    }

    public function test_returns_empty_collection_when_no_matches_found(): void
    {
        // Use an implausible search term
        $filter_data = new CareerFilterData(name: 'XYZNonExistentCareerNameABC123');
        $result = $this->filter_careers->execute($filter_data);

        // Assert
        $this->assertEquals(0, $result->careers->count());
    }
} 