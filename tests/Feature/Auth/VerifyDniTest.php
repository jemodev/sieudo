<?php

declare(strict_types=1);

use App\Models\Opsu;
use App\Models\User;

it('returns opsu data for a valid graduate not yet registered', function () {
    $opsu = Opsu::factory()->create([
        'cedula' => '12345678',
        'nombres' => 'Juan',
        'apellidos' => 'Pérez',
        'sexo' => 'M',
        'correo' => 'juan@example.com',
        'telefono' => '04141234567',
    ]);

    $response = $this->postJson(route('register.verify-dni'), ['dni' => '12345678']);

    $response->assertSuccessful();
    $response->assertJsonFragment([
        'dni' => $opsu->cedula,
        'nombres' => $opsu->nombres,
    ]);
});

it('pads a short dni with leading zeros before searching', function () {
    Opsu::factory()->create(['cedula' => '00123456']);

    $response = $this->postJson(route('register.verify-dni'), ['dni' => '123456']);

    $response->assertSuccessful();
    $response->assertJsonPath('dni', '00123456');
});

it('returns not_found error when dni does not exist in opsu', function () {
    $response = $this->postJson(route('register.verify-dni'), ['dni' => '99999999']);

    $response->assertUnprocessable();
    $response->assertJsonPath('errors.type.0', 'not_found');
});

it('returns already_registered error when a user with that dni already exists', function () {
    Opsu::factory()->create(['cedula' => '12345678']);
    User::factory()->create(['dni' => '12345678']);

    $response = $this->postJson(route('register.verify-dni'), ['dni' => '12345678']);

    $response->assertUnprocessable();
    $response->assertJsonPath('errors.type.0', 'already_registered');
});

it('returns a validation error when the dni has an invalid format', function () {
    $response = $this->postJson(route('register.verify-dni'), ['dni' => 'abc123']);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['dni']);
});

it('returns a validation error when the dni is too short', function () {
    $response = $this->postJson(route('register.verify-dni'), ['dni' => '12345']);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['dni']);
});
