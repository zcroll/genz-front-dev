<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerDefinition
 * 
 * @property int $definition_id
 * @property int $career_id
 * @property string $definition_text
 * @property string|null $source
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerDefinition extends Model
{
	protected $table = 'career_definitions';
	protected $primaryKey = 'definition_id';

	protected $casts = [
		'career_id' => 'int'
	];

	protected $fillable = [
		'career_id',
		'definition_text',
		'source'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
