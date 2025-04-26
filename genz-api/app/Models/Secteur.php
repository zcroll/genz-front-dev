<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Secteur
 * 
 * @property int $id
 * @property string $nom
 * 
 * @property Collection|Formation[] $formations
 *
 * @package App\Models
 */
class Secteur extends Model
{
	protected $table = 'secteurs';
	public $timestamps = false;

	protected $fillable = [
		'nom'
	];

	public function formations()
	{
		return $this->belongsToMany(Formation::class, 'formation_secteurs');
	}
}
