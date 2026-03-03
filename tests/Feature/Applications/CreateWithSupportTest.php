<?php

declare(strict_types=1);

use App\Models\Application;
use App\Models\DocumentType;
use App\Models\Speciality;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('requires authentication to access create with support page', function () {
    $speciality = Speciality::factory()->create();

    $this->get(route('applications.with-support.create', $speciality))
        ->assertRedirect(route('login'));
});

it('shows the create with support page for an authenticated user', function () {
    $speciality = Speciality::factory()->create(['type' => 1]);
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('applications.with-support.create', $speciality))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('applications/create-with-support'),
        );
});

it('excludes document_type 2 for non-health specialities', function () {
    $speciality = Speciality::factory()->create(['type' => 2, 'health_type' => '1']);

    $included = DocumentType::factory()->create([
        'support' => true,
        'visible' => true,
        'document_type' => 1,
        'graduate_cost' => 20.00,
        'undergraduate_cost' => 10.00,
    ]);

    DocumentType::factory()->create([
        'support' => true,
        'visible' => true,
        'document_type' => 2,
        'graduate_cost' => 30.00,
        'undergraduate_cost' => 15.00,
    ]);

    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('applications.with-support.create', $speciality))
        ->assertInertia(fn (Assert $page) => $page
            ->component('applications/create-with-support')
            ->has('documentTypes', 1)
            ->where('documentTypes.0.id', $included->id),
        );
});

it('includes document_type 2 for health specialities', function () {
    $speciality = Speciality::factory()->create(['type' => 2, 'health_type' => '2']);

    DocumentType::factory()->create([
        'code' => 'AA',
        'support' => true,
        'visible' => true,
        'document_type' => 1,
        'graduate_cost' => 20.00,
        'undergraduate_cost' => 10.00,
    ]);

    $healthDoc = DocumentType::factory()->create([
        'code' => 'ZZ',
        'support' => true,
        'visible' => true,
        'document_type' => 2,
        'graduate_cost' => 30.00,
        'undergraduate_cost' => 15.00,
    ]);

    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('applications.with-support.create', $speciality))
        ->assertInertia(fn (Assert $page) => $page
            ->component('applications/create-with-support')
            ->has('documentTypes', 2)
            ->where('documentTypes.1.id', $healthDoc->id),
        );
});

it('stores a with-support application and redirects to dashboard', function () {
    $speciality = Speciality::factory()->create([
        'type' => 1,
        'new_code' => '001',
    ]);

    $docType = DocumentType::factory()->create([
        'code' => 'IR',
        'support' => true,
        'visible' => true,
        'undergraduate_cost' => 10.00,
        'document_type' => 1,
    ]);

    $user = User::factory()->create(['dni' => '12345678']);

    $this->actingAs($user)
        ->post(route('applications.with-support.store', $speciality), [
            'document_codes' => [$docType->code],
        ])
        ->assertRedirect(route('dashboard'));

    $this->assertDatabaseHas('applications', [
        'user_id' => $user->id,
        'speciality_id' => $speciality->id,
        'document_support' => true,
        'status' => '0',
    ]);

    $application = Application::query()->where('user_id', $user->id)->first();

    $this->assertNotNull($application);

    $this->assertDatabaseHas('documents', [
        'application_id' => $application->id,
        'document_type_id' => $docType->id,
        'support' => true,
        'status' => '0',
    ]);
});

it('validates that document codes must belong to support document types', function () {
    $speciality = Speciality::factory()->create();

    $nonSupportDoc = DocumentType::factory()->create([
        'support' => false,
        'visible' => true,
    ]);

    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('applications.with-support.store', $speciality), [
            'document_codes' => [$nonSupportDoc->code],
        ])
        ->assertSessionHasErrors('document_codes.0');
});

it('uses undergraduate_cost for document_type 2 in postgrado speciality', function () {
    $speciality = Speciality::factory()->create([
        'type' => 2,
        'new_code' => '002',
        'health_type' => '2',
    ]);

    $docType = DocumentType::factory()->create([
        'code' => 'INT',
        'support' => true,
        'visible' => true,
        'document_type' => 2,
        'undergraduate_cost' => 15.00,
        'graduate_cost' => 30.00,
    ]);

    $user = User::factory()->create(['dni' => '87654321']);

    $this->actingAs($user)
        ->post(route('applications.with-support.store', $speciality), [
            'document_codes' => [$docType->code],
        ])
        ->assertRedirect(route('dashboard'));

    $this->assertDatabaseHas('applications', [
        'user_id' => $user->id,
        'speciality_id' => $speciality->id,
        'document_support' => true,
        'amount' => '15',
    ]);
});
