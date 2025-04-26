<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class OptionSet
 * 
 * @property int $id
 * @property string|null $name
 * @property string|null $help_text
 * @property string|null $type
 * @property Carbon|null $scraped_at
 *
 * @package App\Models
 */
class OptionSet extends Model
{
	protected $table = 'option_sets';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'scraped_at' => 'datetime'
	];

	protected $fillable = [
		'name',
		'help_text',
		'type',
		'scraped_at'
	];
}
