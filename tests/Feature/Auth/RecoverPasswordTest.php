<?php

declare(strict_types=1);

use App\Models\Question;
use App\Models\User;

it('returns questions and remaining attempts for valid registered dni', function () {
    $user = User::factory()->create(['dni' => '12345678', 'recovery_attempt' => 0]);

    $questions = Question::factory()->count(3)->create();

    foreach ($questions as $question) {
        $user->answers()->create(['question_id' => $question->id, 'answer' => 'respuesta']);
    }

    $response = $this->postJson(route('password.verify-dni'), ['dni' => '12345678']);

    $response->assertSuccessful();
    $response->assertJsonStructure(['questions', 'remaining_attempts']);
    $response->assertJsonCount(3, 'questions');
    $response->assertJsonPath('remaining_attempts', 5);
});

it('returns not_found error for unregistered dni', function () {
    $response = $this->postJson(route('password.verify-dni'), ['dni' => '99999999']);

    $response->assertUnprocessable();
    $response->assertJsonPath('errors.type.0', 'not_found');
});

it('returns blocked when recovery_attempt is 5 or more', function () {
    User::factory()->create(['dni' => '12345678', 'recovery_attempt' => 5]);

    $response = $this->postJson(route('password.verify-dni'), ['dni' => '12345678']);

    $response->assertUnprocessable();
    $response->assertJsonPath('errors.type.0', 'blocked');
});
