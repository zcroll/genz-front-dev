<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class OfpptFormationDetail
 * 
 * @property string $formation_id
 * @property string $detail_type
 * @property string|null $detail_text
 * 
 * @property OfpptFormation $ofppt_formation
 *
 * @package App\Models
 */
class OfpptFormationDetail extends Model
{
	protected $table = 'ofppt_formation_details';
	public $incrementing = false;
	public $timestamps = false;

	protected $fillable = [
		'detail_text'
	];

	public function ofppt_formation()
	{
		return $this->belongsTo(OfpptFormation::class, 'formation_id');
	}
}
