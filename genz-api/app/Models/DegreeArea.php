<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DegreeArea
 * 
 * @property int $id
 * @property int $degree_id
 * @property string $area_code
 * @property string $area_name
 * @property Carbon|null $created_at
 * 
 * @property Degree $degree
 *
 * @package App\Models
 */
class DegreeArea extends Model
{
	protected $table = 'degree_areas';
	public $timestamps = false;

	protected $casts = [
		'degree_id' => 'int'
	];

	protected $fillable = [
		'degree_id',
		'area_code',
		'area_name'
	];

	public function degree()
	{
		return $this->belongsTo(Degree::class, 'degree_id', 'degree_id');
	}
}
