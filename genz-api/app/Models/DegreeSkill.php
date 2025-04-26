<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DegreeSkill
 * 
 * @property int $id
 * @property int $degree_id
 * @property string|null $skill_name
 * @property string|null $description
 * @property Carbon|null $created_at
 * 
 * @property Degree $degree
 *
 * @package App\Models
 */
class DegreeSkill extends Model
{
	protected $table = 'degree_skills';
	public $timestamps = false;

	protected $casts = [
		'degree_id' => 'int'
	];

	protected $fillable = [
		'degree_id',
		'skill_name',
		'description'
	];

	public function degree()
	{
		return $this->belongsTo(Degree::class);
	}
}
