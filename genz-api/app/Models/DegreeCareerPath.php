<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DegreeCareerPath
 * 
 * @property int $id
 * @property int $degree_id
 * @property string|null $career_title
 * @property string|null $career_slug
 * @property string|null $description
 * @property Carbon|null $created_at
 * 
 * @property Degree $degree
 *
 * @package App\Models
 */
class DegreeCareerPath extends Model
{
	protected $table = 'degree_career_paths';
	public $timestamps = false;

	protected $casts = [
		'degree_id' => 'int'
	];

	protected $fillable = [
		'degree_id',
		'career_title',
		'career_slug',
		'description'
	];

	public function degree()
	{
		return $this->belongsTo(Degree::class);
	}
}
