<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerIndustry
 * 
 * @property int $id
 * @property int $career_id
 * @property int $industry_id
 * @property string $industry_name
 * @property Carbon|null $created_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerIndustry extends Model
{
	protected $table = 'career_industries';
	public $timestamps = false;

	protected $casts = [
		'career_id' => 'int',
		'industry_id' => 'int'
	];

	protected $fillable = [
		'career_id',
		'industry_id',
		'industry_name'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
