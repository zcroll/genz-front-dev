<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CareerType
 * 
 * @property int $type_id
 * @property int $career_id
 * @property string $type_name
 * @property string|null $type_description
 * @property int|null $display_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Career $career
 *
 * @package App\Models
 */
class CareerType extends Model
{
	protected $table = 'career_types';
	protected $primaryKey = 'type_id';

	protected $casts = [
		'career_id' => 'int',
		'display_order' => 'int'
	];

	protected $fillable = [
		'career_id',
		'type_name',
		'type_description',
		'display_order'
	];

	public function career()
	{
		return $this->belongsTo(Career::class);
	}
}
