<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ScaleTopCareer
 * 
 * @property int $scale_id
 * @property int $career_id
 * @property Carbon $scraped_at
 *
 * @package App\Models
 */
class ScaleTopCareer extends Model
{
	protected $table = 'scale_top_careers';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'scale_id' => 'int',
		'career_id' => 'int',
		'scraped_at' => 'datetime'
	];

	protected $fillable = [
		'scraped_at'
	];
}
