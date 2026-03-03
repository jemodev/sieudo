<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\GetApplicationsInProcess;
use App\Actions\GetGraduateSpecialities;
use App\DTOs\GraduateSpecialitiesData;
use App\Models\Application;
use App\Models\SystemStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $dni = $request->user()->dni;

        return Inertia::render('dashboard', [
            'specialities' => Inertia::defer(
                fn () => app(GetGraduateSpecialities::class)(new GraduateSpecialitiesData($dni)),
                'primary',
            ),
            'systemStatus' => Inertia::defer(
                fn () => SystemStatus::query()->latest()->first()->system_status ?? 1,
                'primary',
            ),
            'pendingApplications' => Inertia::defer(function () use ($request) {
                $pending = Application::query()
                    ->where('user_id', $request->user()->id)
                    ->where('status', '0')
                    ->get(['speciality_id', 'document_support']);

                return [
                    'withoutSupport' => $pending->where('document_support', false)->pluck('speciality_id')->values(),
                    'withSupport' => $pending->where('document_support', true)->pluck('speciality_id')->values(),
                ];
            }, 'primary'),
            'applicationsInProcess' => Inertia::defer(
                fn () => app(GetApplicationsInProcess::class)($request->user()),
                'secondary',
            ),
        ]);
    }
}
