<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerEmployment
 * 
 * @property int $id
 * @property int $career_id
 * @property string|null $ease_of_employment
 * @property string|null $self_employment
 * @property string|null $employment_type
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerEmployment extends Model
{
	protected $table = 'career_employment';

	protected $casts = [
		'career_id' => 'int'
	];

	protected $fillable = [
		'career_id',
		'ease_of_employment',
		'self_employment',
		'employment_type'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
