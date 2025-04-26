<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerDegree
 * 
 * @property int $id
 * @property int $career_id
 * @property int $degree_id
 * @property Carbon|null $created_at
 * 
 * @property Career $career
 * @property Degree $degree
 *
 * @package App\Models
 */
class CareerDegree extends Model
{
	protected $table = 'career_degrees';
	public $timestamps = false;

	protected $casts = [
		'career_id' => 'int',
		'degree_id' => 'int'
	];

	protected $fillable = [
		'career_id',
		'degree_id'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}

	public function degree()
	{
		return $this->belongsTo(Degree::class);
	}
}
