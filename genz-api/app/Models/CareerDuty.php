<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerDuty
 * 
 * @property int $duty_id
 * @property int $career_id
 * @property string $duty_description
 * @property int|null $display_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerDuty extends Model
{
	protected $table = 'career_duties';
	protected $primaryKey = 'duty_id';

	protected $casts = [
		'career_id' => 'int',
		'display_order' => 'int'
	];

	protected $fillable = [
		'career_id',
		'duty_description',
		'display_order'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
