<?php

declare(strict_types=1);

use App\Actions\GetGraduateSpecialities;
use App\DTOs\GraduateSpecialitiesData;
use App\Models\Opsu;
use App\Models\Speciality;

it('returns specialities for a given dni', function () {
    $speciality = Speciality::factory()->create(['code' => 'CODE01']);
    Opsu::factory()->create(['cedula' => '00012345', 'codigo_tit' => 'CODE01']);

    $result = app(GetGraduateSpecialities::class)(new GraduateSpecialitiesData('00012345'));

    expect($result)->toHaveCount(1)
        ->and($result->first()->id)->toBe($speciality->id);
});

it('returns an empty collection when no opsu records found', function () {
    $result = app(GetGraduateSpecialities::class)(new GraduateSpecialitiesData('99999999'));

    expect($result)->toBeEmpty();
});

it('filters out opsu records with no matching speciality', function () {
    Opsu::factory()->create(['cedula' => '00012345', 'codigo_tit' => 'NONEXISTENT']);

    $result = app(GetGraduateSpecialities::class)(new GraduateSpecialitiesData('00012345'));

    expect($result)->toBeEmpty();
});

it('deduplicates specialities when the same code appears in multiple opsu records', function () {
    $speciality = Speciality::factory()->create(['code' => 'CODE01']);
    Opsu::factory()->count(3)->create(['cedula' => '00012345', 'codigo_tit' => 'CODE01']);

    $result = app(GetGraduateSpecialities::class)(new GraduateSpecialitiesData('00012345'));

    expect($result)->toHaveCount(1)
        ->and($result->first()->id)->toBe($speciality->id);
});
