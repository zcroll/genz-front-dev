<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DegreeProgramOption
 * 
 * @property int $id
 * @property int $degree_id
 * @property string|null $level_name
 * @property string|null $description
 * @property Carbon|null $created_at
 * 
 * @property Degree $degree
 *
 * @package App\Models
 */
class DegreeProgramOption extends Model
{
	protected $table = 'degree_program_options';
	public $timestamps = false;

	protected $casts = [
		'degree_id' => 'int'
	];

	protected $fillable = [
		'degree_id',
		'level_name',
		'description'
	];

	public function degree()
	{
		return $this->belongsTo(Degree::class);
	}
}
