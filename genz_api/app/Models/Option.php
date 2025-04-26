<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Option
 * 
 * @property int $id
 * @property int $option_set_id
 * @property string|null $text
 * @property string|null $help_text
 * @property float|null $value
 * @property float|null $reverse_coded_value
 * @property Carbon|null $scraped_at
 *
 * @package App\Models
 */
class Option extends Model
{
	protected $table = 'options';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'option_set_id' => 'int',
		'value' => 'float',
		'reverse_coded_value' => 'float',
		'scraped_at' => 'datetime'
	];

	protected $fillable = [
		'option_set_id',
		'text',
		'help_text',
		'value',
		'reverse_coded_value',
		'scraped_at'
	];
}
