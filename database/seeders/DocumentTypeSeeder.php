<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\DocumentType;
use Illuminate\Database\Seeder;

class DocumentTypeSeeder extends Seeder
{
    public function run(): void
    {
        DocumentType::query()->create([
            'code' => '41',
            'description' => 'Autenticación de Mención Honorífica',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '0',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '08',
            'description' => 'Programa y Pensum',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '12',
            'description' => 'Tabla de Conversión',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '16',
            'description' => 'Presentación de Trabajo de Grado',
            'area' => 'N',
            'support' => '1',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '18',
            'description' => 'Duración de Período Académico',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '20',
            'description' => 'Carga Horaria',
            'area' => 'N',
            'support' => '1',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '22',
            'description' => 'Certificación de Form. Académica',
            'area' => 'N',
            'support' => '1',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '(Solo Postgrado en Medicina)',
        ]);
        DocumentType::query()->create([
            'code' => '24',
            'description' => 'Autenticación de Notas',
            'area' => 'N',
            'support' => '1',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '26',
            'description' => 'Certificación de Conducta',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '31',
            'description' => 'Carta de Culminación de Carrera',
            'area' => 'T',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '0',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '09',
            'description' => 'Índice de Eficiencia',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '0',
            'document_type' => '3',
            'observation' => '(Exclusivo Docentes UDO)',
        ]);
        DocumentType::query()->create([
            'code' => '29',
            'description' => 'Autenticación de Título',
            'area' => 'T',
            'support' => '1',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '36',
            'description' => 'Reválida',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '4',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '39',
            'description' => 'Internado Rotatorio',
            'area' => 'N',
            'support' => '1',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '2',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '02',
            'description' => 'Notas Certificadas Aprobadas',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '04',
            'description' => 'Notas Certificadas Aprobadas y Reprobadas',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '06',
            'description' => 'Promedio',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '(Solo Pregrado)',
        ]);
        DocumentType::query()->create([
            'code' => '14',
            'description' => 'Documento Facultativo',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '38',
            'description' => 'Modalidad de Estudios',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
        DocumentType::query()->create([
            'code' => '33',
            'description' => 'Promedio Ponderado',
            'area' => 'N',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '0',
            'document_type' => '1',
            'observation' => '(Solo Postgrado)',
        ]);
        DocumentType::query()->create([
            'code' => '27',
            'description' => 'Acta de Grado',
            'area' => 'T',
            'support' => '0',
            'undergraduate_cost' => '10000',
            'graduate_cost' => '15000',
            'visible' => '1',
            'document_type' => '1',
            'observation' => '',
        ]);
    }
}
