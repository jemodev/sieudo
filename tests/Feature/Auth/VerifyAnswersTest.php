<?php

declare(strict_types=1);

use App\Models\Question;
use App\Models\User;

function createUserWithAnswers(array $plainAnswers, array $userAttributes = []): User
{
    $user = User::factory()->create(array_merge(['recovery_attempt' => 0], $userAttributes));

    $questions = Question::factory()->count(3)->create();

    foreach ($questions as $index => $question) {
        $user->answers()->create([
            'question_id' => $question->id,
            'answer' => $plainAnswers[$index],
        ]);
    }

    return $user;
}

it('returns token and email when all answers are correct', function () {
    $user = createUserWithAnswers(['respuesta uno', 'respuesta dos', 'respuesta tres']);

    $response = $this->postJson(route('password.verify-answers'), [
        'dni' => $user->dni,
        'a1' => 'respuesta uno',
        'a2' => 'respuesta dos',
        'a3' => 'respuesta tres',
    ]);

    $response->assertSuccessful();
    $response->assertJsonStructure(['token', 'email']);
    $response->assertJsonPath('email', $user->email);
});

it('resets recovery_attempt to 0 on correct answers', function () {
    $user = createUserWithAnswers(['a', 'b', 'c'], ['recovery_attempt' => 2]);

    $this->postJson(route('password.verify-answers'), [
        'dni' => $user->dni,
        'a1' => 'a',
        'a2' => 'b',
        'a3' => 'c',
    ]);

    expect($user->fresh()->recovery_attempt)->toBe(0);
});

it('increments recovery_attempt on wrong answers', function () {
    $user = createUserWithAnswers(['correcta', 'correcta', 'correcta'], ['recovery_attempt' => 0]);

    $this->postJson(route('password.verify-answers'), [
        'dni' => $user->dni,
        'a1' => 'incorrecta',
        'a2' => 'incorrecta',
        'a3' => 'incorrecta',
    ]);

    expect($user->fresh()->recovery_attempt)->toBe(1);
});

it('returns remaining attempts count on wrong answers', function () {
    $user = createUserWithAnswers(['correcta', 'correcta', 'correcta'], ['recovery_attempt' => 2]);

    $response = $this->postJson(route('password.verify-answers'), [
        'dni' => $user->dni,
        'a1' => 'incorrecta',
        'a2' => 'incorrecta',
        'a3' => 'incorrecta',
    ]);

    $response->assertUnprocessable();
    $response->assertJsonPath('errors.type.0', 'wrong_answers');
    $response->assertJsonPath('errors.remaining.0', '2');
});

it('returns blocked when recovery_attempt reaches 5', function () {
    $user = createUserWithAnswers(['correcta', 'correcta', 'correcta'], ['recovery_attempt' => 4]);

    $response = $this->postJson(route('password.verify-answers'), [
        'dni' => $user->dni,
        'a1' => 'incorrecta',
        'a2' => 'incorrecta',
        'a3' => 'incorrecta',
    ]);

    $response->assertUnprocessable();
    $response->assertJsonPath('errors.type.0', 'wrong_answers');
    expect($user->fresh()->recovery_attempt)->toBe(5);
});

it('normalizes answers: trims whitespace and lowercases before comparing', function () {
    $user = createUserWithAnswers(['respuesta', 'respuesta', 'respuesta']);

    $response = $this->postJson(route('password.verify-answers'), [
        'dni' => $user->dni,
        'a1' => '  RESPUESTA  ',
        'a2' => ' Respuesta ',
        'a3' => 'RESPUESTA',
    ]);

    $response->assertSuccessful();
    $response->assertJsonStructure(['token', 'email']);
});
