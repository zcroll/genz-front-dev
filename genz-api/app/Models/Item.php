<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Item
 * 
 * @property int $id
 * @property int $item_set_id
 * @property string|null $text
 * @property string|null $help_text
 * @property int|null $option_set_id
 * @property bool|null $is_completed
 * @property int|null $career_id
 * @property int|null $degree_id
 * @property string|null $image_url
 * @property string|null $image_colour
 * @property Carbon|null $scraped_at
 *
 * @package App\Models
 */
class Item extends Model
{
	protected $table = 'items';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'item_set_id' => 'int',
		'option_set_id' => 'int',
		'is_completed' => 'bool',
		'career_id' => 'int',
		'degree_id' => 'int',
		'scraped_at' => 'datetime'
	];

	protected $fillable = [
		'item_set_id',
		'text',
		'help_text',
		'option_set_id',
		'is_completed',
		'career_id',
		'degree_id',
		'image_url',
		'image_colour',
		'scraped_at'
	];
}
