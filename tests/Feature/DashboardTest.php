<?php

declare(strict_types=1);

use App\Models\Application;
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

it('returns empty pending applications when user has no pending applications', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->loadDeferredProps(fn (Assert $deferred) => $deferred
                ->where('pendingApplications.withoutSupport', [])
                ->where('pendingApplications.withSupport', []),
            ),
        );
});

it('returns speciality id in pending without support when user has active non-support application', function () {
    $user = User::factory()->create();
    $speciality = Speciality::factory()->create();
    Application::factory()->create([
        'user_id' => $user->id,
        'speciality_id' => $speciality->id,
        'document_support' => false,
        'status' => '0',
    ]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->loadDeferredProps(fn (Assert $deferred) => $deferred
                ->has('pendingApplications.withoutSupport', 1)
                ->where('pendingApplications.withoutSupport.0', $speciality->id)
                ->where('pendingApplications.withSupport', []),
            ),
        );
});

it('returns speciality id in pending with support when user has active support application', function () {
    $user = User::factory()->create();
    $speciality = Speciality::factory()->create();
    Application::factory()->create([
        'user_id' => $user->id,
        'speciality_id' => $speciality->id,
        'document_support' => true,
        'status' => '0',
    ]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->loadDeferredProps(fn (Assert $deferred) => $deferred
                ->has('pendingApplications.withSupport', 1)
                ->where('pendingApplications.withSupport.0', $speciality->id)
                ->where('pendingApplications.withoutSupport', []),
            ),
        );
});

it('returns empty applications in process when user has no active applications', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->loadDeferredProps(fn (Assert $deferred) => $deferred
                ->where('applicationsInProcess', []),
            ),
        );
});

it('returns applications in process for statuses 0 through 8', function () {
    $user = User::factory()->create();
    $speciality = Speciality::factory()->create();

    foreach (['0', '1', '2', '3', '4', '5', '6', '7', '8'] as $status) {
        Application::factory()->create([
            'user_id' => $user->id,
            'speciality_id' => $speciality->id,
            'status' => $status,
        ]);
    }

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->loadDeferredProps(fn (Assert $deferred) => $deferred
                ->has('applicationsInProcess', 9),
            ),
        );
});

it('does not include finalized applications (status 9+) in applications in process', function () {
    $user = User::factory()->create();
    $speciality = Speciality::factory()->create();

    Application::factory()->create([
        'user_id' => $user->id,
        'speciality_id' => $speciality->id,
        'status' => '9',
    ]);

    Application::factory()->create([
        'user_id' => $user->id,
        'speciality_id' => $speciality->id,
        'status' => '1',
    ]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->loadDeferredProps(fn (Assert $deferred) => $deferred
                ->has('applicationsInProcess', 1)
                ->where('applicationsInProcess.0.status', '1'),
            ),
        );
});
