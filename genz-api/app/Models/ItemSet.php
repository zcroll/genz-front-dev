<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ItemSet
 * 
 * @property int $id
 * @property string|null $type
 * @property string|null $title
 * @property string|null $lead_in_text
 * @property string|null $api_url
 * @property Carbon|null $scraped_at
 *
 * @package App\Models
 */
class ItemSet extends Model
{
	protected $table = 'item_sets';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'scraped_at' => 'datetime'
	];

	protected $fillable = [
		'type',
		'title',
		'lead_in_text',
		'api_url',
		'scraped_at'
	];
}
