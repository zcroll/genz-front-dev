<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerEnvironment
 * 
 * @property int $environment_id
 * @property int $career_id
 * @property string $environment_factor
 * @property float $factor_value
 * @property string|null $factor_description
 * @property int|null $display_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerEnvironment extends Model
{
	protected $table = 'career_environment';
	protected $primaryKey = 'environment_id';

	protected $casts = [
		'career_id' => 'int',
		'factor_value' => 'float',
		'display_order' => 'int'
	];

	protected $fillable = [
		'career_id',
		'environment_factor',
		'factor_value',
		'factor_description',
		'display_order'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
