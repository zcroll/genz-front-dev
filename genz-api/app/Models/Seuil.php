<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Seuil
 * 
 * @property int $id
 * @property int|null $formation_id
 * @property string|null $filiere
 * @property string|null $note
 * @property string|null $annee
 * 
 * @property Formation|null $formation
 *
 * @package App\Models
 */
class Seuil extends Model
{
	protected $table = 'seuils';
	public $timestamps = false;

	protected $casts = [
		'formation_id' => 'int'
	];

	protected $fillable = [
		'formation_id',
		'filiere',
		'note',
		'annee'
	];

	public function formation()
	{
		return $this->belongsTo(Formation::class);
	}
}
