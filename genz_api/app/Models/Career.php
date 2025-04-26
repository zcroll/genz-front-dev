<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Career
 * 
 * @property int $id
 * @property string|null $name
 * @property string|null $slug
 * @property string|null $education_level
 * @property float|null $score
 * @property float|null $salary
 * @property string|null $satisfaction
 * @property float|null $satisfaction_raw
 * @property string|null $image
 * @property string|null $link
 * @property bool|null $is_external
 * @property bool|null $is_premium
 * @property Carbon|null $date_scraped
 * @property bool|null $is_scraped
 * @property Carbon|null $scraped_at
 * @property int|null $environment_scraped
 * @property int|null $personality_scraped
 * @property int|null $employment_scraped
 * @property int|null $relationships_scraped
 * 
 * @property Collection|CareerBigFive[] $career_big_fives
 * @property CareerDefinition|null $career_definition
 * @property Collection|Degree[] $degrees
 * @property Collection|CareerDuty[] $career_duties
 * @property Collection|CareerEducationLevel[] $career_education_levels
 * @property CareerEmployment|null $career_employment
 * @property Collection|CareerEmploymentType[] $career_employment_types
 * @property Collection|CareerEnvironment[] $career_environments
 * @property Collection|CareerHollandCode[] $career_holland_codes
 * @property Collection|CareerIndustry[] $career_industries
 * @property CareerPersonalityOverview|null $career_personality_overview
 * @property Collection|CareerType[] $career_types
 * @property CareerWorkSchedule|null $career_work_schedule
 * @property Collection|CareerWorkplace[] $career_workplaces
 *
 * @package App\Models
 */
class Career extends Model
{
	protected $table = 'careers';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'score' => 'float',
		'salary' => 'float',
		'satisfaction_raw' => 'float',
		'is_external' => 'bool',
		'is_premium' => 'bool',
		'date_scraped' => 'datetime',
		'is_scraped' => 'bool',
		'scraped_at' => 'datetime',
		'environment_scraped' => 'int',
		'personality_scraped' => 'int',
		'employment_scraped' => 'int',
		'relationships_scraped' => 'int'
	];

	protected $fillable = [
		'name',
		'slug',
		'education_level',
		'score',
		'salary',
		'satisfaction',
		'satisfaction_raw',
		'image',
		'link',
		'is_external',
		'is_premium',
		'date_scraped',
		'is_scraped',
		'scraped_at',
		'environment_scraped',
		'personality_scraped',
		'employment_scraped',
		'relationships_scraped'
	];

	public function career_big_fives()
	{
		return $this->hasMany(CareerBigFive::class);
	}

	public function career_definition()
	{
		return $this->hasOne(CareerDefinition::class);
	}

	public function degrees()
	{
		return $this->belongsToMany(Degree::class, 'career_degrees', 'career_id', 'degree_id')
					->withPivot('id');
	}

	public function career_duties()
	{
		return $this->hasMany(CareerDuty::class);
	}

	public function career_education_levels()
	{
		return $this->hasMany(CareerEducationLevel::class);
	}

	public function career_employment()
	{
		return $this->hasOne(CareerEmployment::class);
	}

	public function career_employment_types()
	{
		return $this->hasMany(CareerEmploymentType::class);
	}

	public function career_environments()
	{
		return $this->hasMany(CareerEnvironment::class);
	}

	public function career_holland_codes()
	{
		return $this->hasMany(CareerHollandCode::class);
	}

	public function career_industries()
	{
		return $this->hasMany(CareerIndustry::class);
	}

	public function career_personality_overview()
	{
		return $this->hasOne(CareerPersonalityOverview::class);
	}

	public function career_types()
	{
		return $this->hasMany(CareerType::class);
	}

	public function career_work_schedule()
	{
		return $this->hasOne(CareerWorkSchedule::class);
	}

	public function career_workplaces()
	{
		return $this->hasMany(CareerWorkplace::class);
	}
}
