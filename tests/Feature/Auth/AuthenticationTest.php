<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Laravel\Fortify\Features;

test('login screen can be rendered', function () {
    $response = $this->get(route('login'));

    $response->assertOk();
});

test('users can authenticate using the login screen', function () {
    $user = User::factory()->create();

    $response = $this->post(route('login.store'), [
        'dni' => $user->dni,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('users with two factor enabled are redirected to two factor challenge', function () {
    if (!Features::canManageTwoFactorAuthentication()) {
        $this->markTestSkipped('Two-factor authentication is not enabled.');
    }

    Features::twoFactorAuthentication([
        'confirm' => true,
        'confirmPassword' => true,
    ]);

    $user = User::factory()->withTwoFactor()->create();

    $response = $this->post(route('login'), [
        'dni' => $user->dni,
        'password' => 'password',
    ]);

    $response->assertRedirect(route('two-factor.login'));
    $response->assertSessionHas('login.id', $user->id);
    $this->assertGuest();
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post(route('login.store'), [
        'dni' => $user->dni,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('logout'));

    $this->assertGuest();
    $response->assertRedirect(route('home'));
});

test('users are rate limited', function () {
    $user = User::factory()->create();

    $throttleKey = Str::transliterate(Str::lower($user->dni).'|'.'127.0.0.1');
    RateLimiter::increment(md5('login'.$throttleKey), amount: 5);

    $response = $this->post(route('login.store'), [
        'dni' => $user->dni,
        'password' => 'wrong-password',
    ]);

    $response->assertTooManyRequests();
});

it('returns not_found error for unregistered dni', function () {
    $response = $this->post(route('login.store'), [
        'dni' => '99999999',
        'password' => 'password',
    ]);

    $response->assertSessionHasErrors('dni');
});

it('increments login_attempt on wrong password', function () {
    $user = User::factory()->create();

    $this->post(route('login.store'), [
        'dni' => $user->dni,
        'password' => 'wrong-password',
    ]);

    expect($user->fresh()->login_attempt)->toBe(1);
});

it('shows password error with remaining attempts count', function () {
    $user = User::factory()->create(['login_attempt' => 1]);

    $response = $this->post(route('login.store'), [
        'dni' => $user->dni,
        'password' => 'wrong-password',
    ]);

    $response->assertSessionHasErrors(['password' => 'Contraseña incorrecta. Le queda 1 intento.']);
    expect($user->fresh()->login_attempt)->toBe(2);
});

it('blocks login when login_attempt is already 3', function () {
    $user = User::factory()->create(['login_attempt' => 3]);

    $response = $this->post(route('login.store'), [
        'dni' => $user->dni,
        'password' => 'password',
    ]);

    $response->assertSessionHasErrors('blocked');
    $this->assertGuest();
});

it('blocks and sets login_attempt to 3 on third failed attempt', function () {
    $user = User::factory()->create(['login_attempt' => 2]);

    $response = $this->post(route('login.store'), [
        'dni' => $user->dni,
        'password' => 'wrong-password',
    ]);

    $response->assertSessionHasErrors('blocked');
    expect($user->fresh()->login_attempt)->toBe(3);
    $this->assertGuest();
});

it('resets login_attempt to 0 on successful login', function () {
    $user = User::factory()->create(['login_attempt' => 2]);

    $this->post(route('login.store'), [
        'dni' => $user->dni,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    expect($user->fresh()->login_attempt)->toBe(0);
});
