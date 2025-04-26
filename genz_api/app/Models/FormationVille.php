<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class FormationVille
 * 
 * @property int $formation_id
 * @property int $ville_id
 * 
 * @property Formation $formation
 * @property Ville $ville
 *
 * @package App\Models
 */
class FormationVille extends Model
{
	protected $table = 'formation_villes';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'formation_id' => 'int',
		'ville_id' => 'int'
	];

	public function formation()
	{
		return $this->belongsTo(Formation::class);
	}

	public function ville()
	{
		return $this->belongsTo(Ville::class);
	}
}
