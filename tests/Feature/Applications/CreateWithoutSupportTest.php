<?php

declare(strict_types=1);

use App\Models\Application;
use App\Models\DocumentType;
use App\Models\Speciality;
use App\Models\SystemStatus;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('redirects unauthenticated users to login', function () {
    $speciality = Speciality::factory()->create();

    $this->get(route('applications.without-support.create', $speciality))
        ->assertRedirect(route('login'));
});

it('renders the create without support inertia page', function () {
    $speciality = Speciality::factory()->create(['type' => 1]);
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('applications.without-support.create', $speciality))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('applications/create-without-support'),
        );
});

it('returns available documents for a pregrado speciality', function () {
    $speciality = Speciality::factory()->create(['type' => 1]);

    $visible = DocumentType::factory()->create([
        'support' => false,
        'visible' => true,
        'undergraduate_cost' => 15.00,
        'graduate_cost' => 0,
    ]);

    DocumentType::factory()->create([
        'support' => false,
        'visible' => true,
        'undergraduate_cost' => 0,
        'graduate_cost' => 20.00,
    ]);

    DocumentType::factory()->create([
        'support' => true,
        'visible' => true,
        'undergraduate_cost' => 10.00,
        'graduate_cost' => 0,
    ]);

    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('applications.without-support.create', $speciality))
        ->assertInertia(fn (Assert $page) => $page
            ->component('applications/create-without-support')
            ->has('documentTypes', 1)
            ->where('documentTypes.0.id', $visible->id),
        );
});

it('returns available documents for a postgrado speciality', function () {
    $speciality = Speciality::factory()->create(['type' => 2]);

    $visible = DocumentType::factory()->create([
        'support' => false,
        'visible' => true,
        'undergraduate_cost' => 0,
        'graduate_cost' => 20.00,
    ]);

    DocumentType::factory()->create([
        'support' => false,
        'visible' => true,
        'undergraduate_cost' => 15.00,
        'graduate_cost' => 0,
    ]);

    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('applications.without-support.create', $speciality))
        ->assertInertia(fn (Assert $page) => $page
            ->component('applications/create-without-support')
            ->has('documentTypes', 1)
            ->where('documentTypes.0.id', $visible->id),
        );
});

it('creates an application with documents on valid submission', function () {
    $speciality = Speciality::factory()->create([
        'type' => 1,
        'new_code' => '001',
    ]);

    $docType = DocumentType::factory()->create([
        'code' => 'NT',
        'support' => false,
        'visible' => true,
        'undergraduate_cost' => 10.00,
        'document_type' => 'NT',
    ]);

    $user = User::factory()->create(['dni' => '12345678']);

    $this->actingAs($user)
        ->post(route('applications.without-support.store', $speciality), [
            'document_codes' => [$docType->code],
        ])
        ->assertRedirect(route('dashboard'));

    $this->assertDatabaseHas('applications', [
        'user_id' => $user->id,
        'speciality_id' => $speciality->id,
        'document_support' => false,
        'status' => '0',
    ]);

    $application = Application::query()->where('user_id', $user->id)->first();

    $this->assertNotNull($application);

    $this->assertDatabaseHas('documents', [
        'application_id' => $application->id,
        'document_type_id' => $docType->id,
        'support' => false,
        'status' => '0',
    ]);
});

it('validates at least one document must be selected', function () {
    $speciality = Speciality::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('applications.without-support.store', $speciality), [
            'document_codes' => [],
        ])
        ->assertSessionHasErrors('document_codes');
});

it('validates document codes must exist in document_types', function () {
    $speciality = Speciality::factory()->create();
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('applications.without-support.store', $speciality), [
            'document_codes' => ['NONEXISTENT'],
        ])
        ->assertSessionHasErrors('document_codes.0');
});

it('increments application_count on creation', function () {
    $status = SystemStatus::factory()->create([
        'application_count' => 5,
        'max_applications' => 100,
    ]);

    $speciality = Speciality::factory()->create(['type' => 1, 'new_code' => '001']);

    $docType = DocumentType::factory()->create([
        'support' => false,
        'visible' => true,
        'undergraduate_cost' => 10.00,
        'document_type' => 'NT',
    ]);

    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('applications.without-support.store', $speciality), [
            'document_codes' => [$docType->code],
        ]);

    $this->assertDatabaseHas('system_statuses', [
        'id' => $status->id,
        'application_count' => 6,
        'system_status' => 1,
    ]);
});

it('marks system as collapsed when max_applications is reached', function () {
    $status = SystemStatus::factory()->create([
        'application_count' => 99,
        'max_applications' => 100,
        'system_status' => 1,
    ]);

    $speciality = Speciality::factory()->create(['type' => 1, 'new_code' => '001']);

    $docType = DocumentType::factory()->create([
        'support' => false,
        'visible' => true,
        'undergraduate_cost' => 10.00,
        'document_type' => 'NT',
    ]);

    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('applications.without-support.store', $speciality), [
            'document_codes' => [$docType->code],
        ]);

    $this->assertDatabaseHas('system_statuses', [
        'id' => $status->id,
        'application_count' => 100,
        'system_status' => 3,
    ]);
});
