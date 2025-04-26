<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerHollandCode
 * 
 * @property int $holland_id
 * @property int $career_id
 * @property string $code_name
 * @property float $code_value
 * @property string|null $code_description
 * @property int|null $display_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerHollandCode extends Model
{
	protected $table = 'career_holland_codes';
	protected $primaryKey = 'holland_id';

	protected $casts = [
		'career_id' => 'int',
		'code_value' => 'float',
		'display_order' => 'int'
	];

	protected $fillable = [
		'career_id',
		'code_name',
		'code_value',
		'code_description',
		'display_order'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
