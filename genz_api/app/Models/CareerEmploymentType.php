<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerEmploymentType
 * 
 * @property int $id
 * @property int $career_id
 * @property string $employment_type
 * @property string|null $ease_of_employment
 * @property string|null $self_employment
 * @property Carbon|null $created_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerEmploymentType extends Model
{
	protected $table = 'career_employment_types';
	public $timestamps = false;

	protected $casts = [
		'career_id' => 'int'
	];

	protected $fillable = [
		'career_id',
		'employment_type',
		'ease_of_employment',
		'self_employment'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
