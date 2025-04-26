<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DegreeEducationLevel
 * 
 * @property int $id
 * @property int $degree_id
 * @property int $education_level
 * @property Carbon|null $created_at
 * 
 * @property Degree $degree
 *
 * @package App\Models
 */
class DegreeEducationLevel extends Model
{
	protected $table = 'degree_education_levels';
	public $timestamps = false;

	protected $casts = [
		'degree_id' => 'int',
		'education_level' => 'int'
	];

	protected $fillable = [
		'degree_id',
		'education_level'
	];

	public function degree()
	{
		return $this->belongsTo(Degree::class);
	}
}
