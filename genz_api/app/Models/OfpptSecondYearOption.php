<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class OfpptSecondYearOption
 * 
 * @property string $id
 * @property string|null $parent_formation_id
 * @property string $title
 * @property string|null $description
 * @property string|null $level
 * @property string|null $course_type
 * @property string|null $qualification_type
 * @property string|null $url
 * 
 * @property OfpptFormation|null $ofppt_formation
 *
 * @package App\Models
 */
class OfpptSecondYearOption extends Model
{
	protected $table = 'ofppt_second_year_options';
	public $incrementing = false;
	public $timestamps = false;

	protected $fillable = [
		'parent_formation_id',
		'title',
		'description',
		'level',
		'course_type',
		'qualification_type',
		'url'
	];

	public function ofppt_formation()
	{
		return $this->belongsTo(OfpptFormation::class, 'parent_formation_id');
	}
}
