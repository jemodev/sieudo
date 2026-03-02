<?php

declare(strict_types=1);

use App\Models\Opsu;
use App\Models\Speciality;
use App\Models\SystemStatus;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))
        ->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('dashboard'))
        ->assertOk();
});

it('renders the dashboard inertia page', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page->component('dashboard'));
});

it('loads the authenticated user specialities via deferred props', function () {
    $speciality = Speciality::factory()->create(['code' => 'CODE01']);
    $user = User::factory()->create(['dni' => '00012345']);
    Opsu::factory()->create(['cedula' => '00012345', 'codigo_tit' => 'CODE01']);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->missing('specialities')
            ->loadDeferredProps(fn (Assert $deferred) => $deferred
                ->has('specialities', 1)
                ->where('specialities.0.id', $speciality->id),
            ),
        );
});

it('returns empty specialities when user has no opsu records', function () {
    $user = User::factory()->create(['dni' => '99999999']);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->loadDeferredProps(fn (Assert $deferred) => $deferred
                ->has('specialities', 0),
            ),
        );
});

it('defaults systemStatus to 1 when no record exists', function () {
    SystemStatus::query()->delete();
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->loadDeferredProps(fn (Assert $deferred) => $deferred
                ->where('systemStatus', 1),
            ),
        );
});

it('loads the latest systemStatus value', function () {
    SystemStatus::factory()->create(['system_status' => 2]);
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->loadDeferredProps(fn (Assert $deferred) => $deferred
                ->where('systemStatus', 2),
            ),
        );
});
