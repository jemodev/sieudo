<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Opsu extends Model
{
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
}
