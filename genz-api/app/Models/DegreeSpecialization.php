<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DegreeSpecialization
 * 
 * @property int $id
 * @property int $degree_id
 * @property string $specialization_name
 * @property Carbon|null $created_at
 * 
 * @property Degree $degree
 *
 * @package App\Models
 */
class DegreeSpecialization extends Model
{
	protected $table = 'degree_specializations';
	public $timestamps = false;

	protected $casts = [
		'degree_id' => 'int'
	];

	protected $fillable = [
		'degree_id',
		'specialization_name'
	];

	public function degree()
	{
		return $this->belongsTo(Degree::class);
	}
}
