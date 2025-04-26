<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class OfpptEstablishment
 * 
 * @property string $id
 * @property string $name
 * @property string|null $city
 * @property string|null $type
 * 
 * @property Collection|OfpptEstablishmentFormation[] $ofppt_establishment_formations
 *
 * @package App\Models
 */
class OfpptEstablishment extends Model
{
	protected $table = 'ofppt_establishments';
	public $incrementing = false;
	public $timestamps = false;

	protected $fillable = [
		'name',
		'city',
		'type'
	];

	public function ofppt_establishment_formations()
	{
		return $this->hasMany(OfpptEstablishmentFormation::class, 'establishment_id');
	}
}
