<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerWorkSchedule
 * 
 * @property int $schedule_id
 * @property int $career_id
 * @property float|null $full_time_percent
 * @property float|null $part_time_percent
 * @property string|null $schedule_description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerWorkSchedule extends Model
{
	protected $table = 'career_work_schedule';
	protected $primaryKey = 'schedule_id';

	protected $casts = [
		'career_id' => 'int',
		'full_time_percent' => 'float',
		'part_time_percent' => 'float'
	];

	protected $fillable = [
		'career_id',
		'full_time_percent',
		'part_time_percent',
		'schedule_description'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
