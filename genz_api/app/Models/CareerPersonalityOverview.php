<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerPersonalityOverview
 * 
 * @property int $overview_id
 * @property int $career_id
 * @property string|null $holland_summary
 * @property string|null $big_five_summary
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerPersonalityOverview extends Model
{
	protected $table = 'career_personality_overview';
	protected $primaryKey = 'overview_id';

	protected $casts = [
		'career_id' => 'int'
	];

	protected $fillable = [
		'career_id',
		'holland_summary',
		'big_five_summary'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
