<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Scale
 * 
 * @property int $id
 * @property string|null $name
 * @property string|null $short_name
 * @property Carbon $scraped_at
 *
 * @package App\Models
 */
class Scale extends Model
{
	protected $table = 'scales';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'scraped_at' => 'datetime'
	];

	protected $fillable = [
		'name',
		'short_name',
		'scraped_at'
	];
}
