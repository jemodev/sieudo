<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Opsu extends Model
{
    /** @use HasFactory<\Database\Factories\OpsuFactory> */
    use HasFactory;

    protected $table = 'opsu';

    protected $fillable = [
        'cedula',
        'apellidos',
        'nombres',
        'sexo',
        'fecha_nac',
        'codigo_nat',
        'codigo_tit',
        'fecha_grado',
        'libro',
        'folio',
        'nucleo_id',
        'promedio',
        'ubicacion',
        'mencion',
        'telefono',
        'correo',
    ];

    /** @return BelongsTo<Speciality, $this> */
    public function speciality(): BelongsTo
    {
        return $this->belongsTo(Speciality::class, 'codigo_tit', 'code');
    }
}
