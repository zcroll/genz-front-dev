<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Formation
 * 
 * @property int $id
 * @property string $titre
 * @property string|null $frais
 * @property string|null $type
 * @property string|null $langue_etude
 * @property string|null $description
 * @property string|null $programme
 * @property int|null $annee_etudes
 * @property int|null $diplome_id
 * @property int|null $ecole_id
 * @property bool|null $est_concours
 * @property bool|null $est_test
 * 
 * @property Diplome|null $diplome
 * @property Ecole|null $ecole
 * @property Collection|Secteur[] $secteurs
 * @property Collection|Ville[] $villes
 * @property Collection|Seuil[] $seuils
 *
 * @package App\Models
 */
class Formation extends Model
{
	protected $table = 'formations';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'annee_etudes' => 'int',
		'diplome_id' => 'int',
		'ecole_id' => 'int',
		'est_concours' => 'bool',
		'est_test' => 'bool'
	];

	protected $fillable = [
		'titre',
		'frais',
		'type',
		'langue_etude',
		'description',
		'programme',
		'annee_etudes',
		'diplome_id',
		'ecole_id',
		'est_concours',
		'est_test'
	];

	public function diplome()
	{
		return $this->belongsTo(Diplome::class);
	}

	public function ecole()
	{
		return $this->belongsTo(Ecole::class);
	}

	public function secteurs()
	{
		return $this->belongsToMany(Secteur::class, 'formation_secteurs');
	}

	public function villes()
	{
		return $this->belongsToMany(Ville::class, 'formation_villes');
	}

	public function seuils()
	{
		return $this->hasMany(Seuil::class);
	}
}
