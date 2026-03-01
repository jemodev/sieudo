<?php

declare(strict_types=1);

use App\Models\User;

it('returns ok when the email is not taken', function () {
    $response = $this->postJson(route('register.validate'), ['email' => 'new@example.com']);

    $response->assertSuccessful();
    $response->assertJsonPath('ok', true);
});

it('returns a validation error when the email is already registered', function () {
    User::factory()->create(['email' => 'existing@example.com']);

    $response = $this->postJson(route('register.validate'), ['email' => 'existing@example.com']);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['email']);
});

it('returns a validation error for an invalid email format', function () {
    $response = $this->postJson(route('register.validate'), ['email' => 'not-an-email']);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['email']);
});
