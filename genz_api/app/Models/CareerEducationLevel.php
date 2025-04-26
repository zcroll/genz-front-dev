<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerEducationLevel
 * 
 * @property int $id
 * @property int $career_id
 * @property int $education_level_id
 * @property string $education_level_name
 * @property Carbon|null $created_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerEducationLevel extends Model
{
	protected $table = 'career_education_levels';
	public $timestamps = false;

	protected $casts = [
		'career_id' => 'int',
		'education_level_id' => 'int'
	];

	protected $fillable = [
		'career_id',
		'education_level_id',
		'education_level_name'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
