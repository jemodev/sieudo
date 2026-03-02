<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\GetGraduateSpecialities;
use App\DTOs\GraduateSpecialitiesData;
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
        ]);
    }
}
