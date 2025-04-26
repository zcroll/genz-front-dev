<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DegreeTuition
 * 
 * @property int $id
 * @property int $degree_id
 * @property float|null $in_state_tuition
 * @property float|null $out_state_tuition
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Degree $degree
 *
 * @package App\Models
 */
class DegreeTuition extends Model
{
	protected $table = 'degree_tuition';

	protected $casts = [
		'degree_id' => 'int',
		'in_state_tuition' => 'float',
		'out_state_tuition' => 'float'
	];

	protected $fillable = [
		'degree_id',
		'in_state_tuition',
		'out_state_tuition'
	];

	public function degree()
	{
		return $this->belongsTo(Degree::class);
	}
}
