<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerWorkplace
 * 
 * @property int $workplace_id
 * @property int $career_id
 * @property string|null $workplace_description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerWorkplace extends Model
{
	protected $table = 'career_workplace';
	protected $primaryKey = 'workplace_id';

	protected $casts = [
		'career_id' => 'int'
	];

	protected $fillable = [
		'career_id',
		'workplace_description'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
