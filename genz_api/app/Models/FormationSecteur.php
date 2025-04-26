<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class FormationSecteur
 * 
 * @property int $formation_id
 * @property int $secteur_id
 * 
 * @property Formation $formation
 * @property Secteur $secteur
 *
 * @package App\Models
 */
class FormationSecteur extends Model
{
	protected $table = 'formation_secteurs';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'formation_id' => 'int',
		'secteur_id' => 'int'
	];

	public function formation()
	{
		return $this->belongsTo(Formation::class);
	}

	public function secteur()
	{
		return $this->belongsTo(Secteur::class);
	}
}
