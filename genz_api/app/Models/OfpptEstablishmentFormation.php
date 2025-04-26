<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class OfpptEstablishmentFormation
 * 
 * @property string $establishment_id
 * @property string $formation_id
 * 
 * @property OfpptEstablishment $ofppt_establishment
 * @property OfpptFormation $ofppt_formation
 *
 * @package App\Models
 */
class OfpptEstablishmentFormation extends Model
{
	protected $table = 'ofppt_establishment_formations';
	public $incrementing = false;
	public $timestamps = false;

	public function ofppt_establishment()
	{
		return $this->belongsTo(OfpptEstablishment::class, 'establishment_id');
	}

	public function ofppt_formation()
	{
		return $this->belongsTo(OfpptFormation::class, 'formation_id');
	}
}
