<?php

namespace Tests\Feature\Actions\Degree;

use App\Actions\Degree\FilterDegrees;
use App\DTOs\DegreeFilterData;
use App\Models\Degree;
use App\Models\DegreeArea;
use Tests\TestCase;

class FilterDegreesTest extends TestCase
{
    private FilterDegrees $filter_degrees;

    protected function setUp(): void
    {
        parent::setUp();
        $this->filter_degrees = new FilterDegrees();
    }

    public function test_filters_degrees_by_name(): void
    {
        // Find an existing degree with a name that contains "Computer"
        $degree = Degree::where('name', 'like', '%Computer%')->first();
        
        if (!$degree) {
            $this->markTestSkipped('No degrees with "Computer" in the name found in the database.');
        }
        
        // Act
        $filter_data = new DegreeFilterData(name: 'Computer');
        $result = $this->filter_degrees->execute($filter_data);

        // Assert
        $this->assertGreaterThanOrEqual(1, $result->degrees->count());
        
        // Check that at least one degree with "Computer" in the name exists in the results
        $foundMatchingName = false;
        foreach ($result->degrees as $degreeResult) {
            if (stripos($degreeResult->name, 'Computer') !== false) {
                $foundMatchingName = true;
                break;
            }
        }
        
        $this->assertTrue($foundMatchingName, 'Expected to find a degree with "Computer" in the name in the results');
    }

    public function test_filters_degrees_by_area_name(): void
    {
        // Find an existing area
        $area = DegreeArea::first();
        
        if (!$area) {
            $this->markTestSkipped('No degree areas found in the database.');
        }
        
        // Act
        $filter_data = new DegreeFilterData(area_names: [$area->area_name]);
        $result = $this->filter_degrees->execute($filter_data);

        // Assert
        $this->assertNotEmpty($result->degrees);
        
        // Check if the original area's degree is in the results
        $foundOriginalDegree = false;
        foreach ($result->degrees as $degreeResult) {
            if ($degreeResult->degree_id === $area->degree_id) {
                $foundOriginalDegree = true;
                break;
            }
        }
        
        $this->assertTrue($foundOriginalDegree, 'Expected to find the original degree in the filtered results');
    }
    
    public function test_filters_degrees_by_area_code(): void
    {
        // Find an existing area with code
        $area = DegreeArea::whereNotNull('area_code')->first();
        
        if (!$area) {
            $this->markTestSkipped('No degree areas with codes found in the database.');
        }
        
        // Act
        $filter_data = new DegreeFilterData(area_codes: [$area->area_code]);
        $result = $this->filter_degrees->execute($filter_data);

        // Assert
        $this->assertNotEmpty($result->degrees);
    }
    
    public function test_filters_degrees_by_degree_level(): void
    {
        // Get a degree level from existing degrees
        $degree = Degree::whereNotNull('degree_level')->first();
        
        if (!$degree) {
            $this->markTestSkipped('No degrees with degree_level found in the database.');
        }
        
        // Act
        $filter_data = new DegreeFilterData(degree_level: $degree->degree_level);
        $result = $this->filter_degrees->execute($filter_data);

        // Assert
        $this->assertNotEmpty($result->degrees);
        
        // Check that all degrees have the correct degree level
        foreach ($result->degrees as $degreeResult) {
            $this->assertEquals($degree->degree_level, $degreeResult->degree_level);
        }
    }

    public function test_returns_all_degrees_when_no_filters_applied(): void
    {
        // Get count of all degrees to compare
        $totalDegreesCount = Degree::count();
        
        if ($totalDegreesCount === 0) {
            $this->markTestSkipped('No degrees found in the database.');
        }
        
        // Act
        $filter_data = new DegreeFilterData();
        $result = $this->filter_degrees->execute($filter_data);

        // Assert - with pagination, we should get up to the per_page limit, not necessarily all degrees
        $this->assertGreaterThan(0, $result->degrees->count());
        
        // If total degrees is less than default per_page (15), then the count should match
        if ($totalDegreesCount <= 15) {
            $this->assertEquals($totalDegreesCount, $result->degrees->count());
        }
    }

    public function test_returns_empty_collection_when_no_matches_found(): void
    {
        // Use an implausible search term
        $filter_data = new DegreeFilterData(name: 'XYZNonExistentDegreeNameABC123');
        $result = $this->filter_degrees->execute($filter_data);

        // Assert
        $this->assertEquals(0, $result->degrees->count());
    }
} 