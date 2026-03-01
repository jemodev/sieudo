<?php

declare(strict_types=1);

use App\Models\Answer;
use App\Models\Question;
use Illuminate\Support\Facades\Hash;

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

it('creates a user and three security answers with valid data', function () {
    $questions = Question::factory()->count(3)->create();

    $response = $this->postJson(route('register.store'), [
        'dni' => '12345678',
        'name' => 'Juan',
        'surname' => 'Pérez',
        'gender' => 'M',
        'email' => 'juan@example.com',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
        'phone' => '04141234567',
        'q1_id' => $questions[0]->id,
        'q1_answer' => 'primera respuesta',
        'q2_id' => $questions[1]->id,
        'q2_answer' => 'segunda respuesta',
        'q3_id' => $questions[2]->id,
        'q3_answer' => 'tercera respuesta',
    ]);

    $response->assertStatus(201);
    $this->assertAuthenticated();
    $this->assertDatabaseHas('users', ['email' => 'juan@example.com', 'dni' => '12345678']);
    $this->assertDatabaseCount('answers', 3);
});

it('stores security answers hashed and normalized', function () {
    $questions = Question::factory()->count(3)->create();

    $this->postJson(route('register.store'), [
        'dni' => '12345678',
        'name' => 'Juan',
        'surname' => 'Pérez',
        'gender' => 'M',
        'email' => 'juan@example.com',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
        'phone' => '04141234567',
        'q1_id' => $questions[0]->id,
        'q1_answer' => 'Mi Mascota',
        'q2_id' => $questions[1]->id,
        'q2_answer' => '  Segunda Respuesta  ',
        'q3_id' => $questions[2]->id,
        'q3_answer' => 'tercera respuesta',
    ]);

    $answers = Answer::query()->withoutGlobalScopes()->get();

    expect(Hash::check('mi mascota', $answers[0]->getRawOriginal('answer')))->toBeTrue()
        ->and(Hash::check('segunda respuesta', $answers[1]->getRawOriginal('answer')))->toBeTrue()
        ->and(Hash::check('tercera respuesta', $answers[2]->getRawOriginal('answer')))->toBeTrue();
});

it('returns validation errors when required fields are missing', function () {
    $response = $this->postJson(route('register.store'), [
        'email' => 'test@example.com',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['dni', 'name', 'surname', 'gender']);
});
