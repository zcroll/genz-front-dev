<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DegreeOverview
 * 
 * @property int $id
 * @property int $degree_id
 * @property string|null $overview_text
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Degree $degree
 *
 * @package App\Models
 */
class DegreeOverview extends Model
{
	protected $table = 'degree_overview';

	protected $casts = [
		'degree_id' => 'int'
	];

	protected $fillable = [
		'degree_id',
		'overview_text'
	];

	public function degree()
	{
		return $this->belongsTo(Degree::class);
	}
}
