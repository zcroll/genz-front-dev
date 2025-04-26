<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerBigFive
 * 
 * @property int $trait_id
 * @property int $career_id
 * @property string $trait_name
 * @property float $trait_value
 * @property string|null $trait_description
 * @property int|null $display_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerBigFive extends Model
{
	protected $table = 'career_big_five';
	protected $primaryKey = 'trait_id';

	protected $casts = [
		'career_id' => 'int',
		'trait_value' => 'float',
		'display_order' => 'int'
	];

	protected $fillable = [
		'career_id',
		'trait_name',
		'trait_value',
		'trait_description',
		'display_order'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
