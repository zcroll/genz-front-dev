<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Ecole
 * 
 * @property int $id
 * @property string|null $sigle
 * @property string $nom
 * @property string|null $universite
 * @property string|null $type
 * @property string|null $site_web
 * @property string|null $pays
 * @property string|null $logo_url
 * 
 * @property Collection|Formation[] $formations
 *
 * @package App\Models
 */
class Ecole extends Model
{
	protected $table = 'ecoles';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int'
	];

	protected $fillable = [
		'sigle',
		'nom',
		'universite',
		'type',
		'site_web',
		'pays',
		'logo_url'
	];

	public function formations()
	{
		return $this->hasMany(Formation::class);
	}
}
