<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Degree
 * 
 * @property int $degree_id
 * @property string $name
 * @property string $slug
 * @property int $degree_level
 * @property string|null $cip_code
 * @property float|null $salary
 * @property string|null $satisfaction
 * @property float|null $satisfaction_raw
 * @property string|null $image_url
 * @property string|null $large_image_url
 * @property string|null $link
 * @property bool|null $is_external
 * @property bool|null $is_premium
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int|null $content_scraped
 * 
 * @property Collection|Career[] $careers
 * @property Collection|DegreeArea[] $degree_areas
 * @property Collection|DegreeCareerPath[] $degree_career_paths
 * @property Collection|DegreeEducationLevel[] $degree_education_levels
 * @property DegreeOverview|null $degree_overview
 * @property Collection|DegreeProgramOption[] $degree_program_options
 * @property Collection|DegreeSkill[] $degree_skills
 * @property Collection|DegreeSpecialization[] $degree_specializations
 * @property DegreeTuition|null $degree_tuition
 *
 * @package App\Models
 */
class Degree extends Model
{
	protected $table = 'degrees';
	protected $primaryKey = 'degree_id';
	public $incrementing = false;

	protected $casts = [
		'degree_id' => 'int',
		'degree_level' => 'int',
		'salary' => 'float',
		'satisfaction_raw' => 'float',
		'is_external' => 'bool',
		'is_premium' => 'bool',
		'content_scraped' => 'int'
	];

	protected $fillable = [
		'name',
		'slug',
		'degree_level',
		'cip_code',
		'salary',
		'satisfaction',
		'satisfaction_raw',
		'image_url',
		'large_image_url',
		'link',
		'is_external',
		'is_premium',
		'content_scraped'
	];

	public function careers()
	{
		return $this->belongsToMany(Career::class, 'career_degrees', 'degree_id', 'career_id')
					->withPivot('id');
	}

	public function degree_areas()
	{
		return $this->hasMany(DegreeArea::class, 'degree_id', 'degree_id');
	}

	public function degree_career_paths()
	{
		return $this->hasMany(DegreeCareerPath::class);
	}

	public function degree_education_levels()
	{
		return $this->hasMany(DegreeEducationLevel::class);
	}

	public function degree_overview()
	{
		return $this->hasOne(DegreeOverview::class);
	}

	public function degree_program_options()
	{
		return $this->hasMany(DegreeProgramOption::class);
	}

	public function degree_skills()
	{
		return $this->hasMany(DegreeSkill::class);
	}

	public function degree_specializations()
	{
		return $this->hasMany(DegreeSpecialization::class);
	}

	public function degree_tuition()
	{
		return $this->hasOne(DegreeTuition::class);
	}
}
