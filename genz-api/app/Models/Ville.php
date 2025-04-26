<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Ville
 * 
 * @property int $id
 * @property string $nom
 * 
 * @property Collection|Formation[] $formations
 *
 * @package App\Models
 */
class Ville extends Model
{
	protected $table = 'villes';
	public $timestamps = false;

	protected $fillable = [
		'nom'
	];

	public function formations()
	{
		return $this->belongsToMany(Formation::class, 'formation_villes');
	}
}
