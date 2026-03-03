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
            ),
            'systemStatus' => Inertia::defer(
                fn () => SystemStatus::query()->latest()->first()->system_status ?? 1,
            ),
            'pendingApplicationSpecialityIds' => Inertia::defer(
                fn () => Application::query()
                    ->where('user_id', $request->user()->id)
                    ->where('document_support', false)
                    ->where('status', '0')
                    ->pluck('speciality_id')
                    ->all(),
            ),
            'pendingApplicationWithSupportSpecialityIds' => Inertia::defer(
                fn () => Application::query()
                    ->where('user_id', $request->user()->id)
                    ->where('document_support', true)
                    ->where('status', '0')
                    ->pluck('speciality_id')
                    ->all(),
            ),
            'applicationsInProcess' => Inertia::defer(
                fn () => app(GetApplicationsInProcess::class)($request->user()),
            ),
        ]);
    }
}
