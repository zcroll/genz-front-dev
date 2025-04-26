<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class OfpptFormation
 * 
 * @property string $id
 * @property string $title
 * @property string|null $level
 * @property string|null $course_type
 * @property string|null $qualification_type
 * @property string|null $sector
 * @property string|null $sector_id
 * @property string|null $description
 * @property bool|null $is_common_core
 * @property string|null $url
 * 
 * @property Collection|OfpptEstablishmentFormation[] $ofppt_establishment_formations
 * @property Collection|OfpptFormationDetail[] $ofppt_formation_details
 * @property Collection|OfpptSecondYearOption[] $ofppt_second_year_options
 *
 * @package App\Models
 */
class OfpptFormation extends Model
{
	protected $table = 'ofppt_formations';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'is_common_core' => 'bool'
	];

	protected $fillable = [
		'title',
		'level',
		'course_type',
		'qualification_type',
		'sector',
		'sector_id',
		'description',
		'is_common_core',
		'url'
	];

	public function ofppt_establishment_formations()
	{
		return $this->hasMany(OfpptEstablishmentFormation::class, 'formation_id');
	}

	public function ofppt_formation_details()
	{
		return $this->hasMany(OfpptFormationDetail::class, 'formation_id');
	}

	public function ofppt_second_year_options()
	{
		return $this->hasMany(OfpptSecondYearOption::class, 'parent_formation_id');
	}
}
