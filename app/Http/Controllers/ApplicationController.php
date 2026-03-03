<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\CreateApplicationWithoutSupport;
use App\Actions\CreateApplicationWithSupport;
use App\Actions\GetDocumentsWithoutSupport;
use App\Actions\GetDocumentsWithSupport;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\StoreApplicationWithSupportRequest;
use App\Models\Speciality;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

final class ApplicationController extends Controller
{
    public function create(Speciality $speciality, GetDocumentsWithoutSupport $action): Response
    {
        return Inertia::render('applications/create-without-support', [
            'speciality' => $speciality->only('id', 'name', 'title', 'type', 'new_code'),
            'documentTypes' => $action($speciality)->map(fn ($dt) => [
                'id' => $dt->id,
                'code' => $dt->code,
                'description' => $dt->description,
                'price' => $speciality->type === 1
                    ? $dt->undergraduate_cost
                    : $dt->graduate_cost,
            ]),
            'graduate' => [
                'name' => auth()->user()->full_name,
                'dni' => auth()->user()->dni,
            ],
        ]);
    }

    public function store(
        StoreApplicationRequest $request,
        Speciality $speciality,
        CreateApplicationWithoutSupport $action,
    ): RedirectResponse {
        $action($request->toDto($speciality));

        return to_route('dashboard');
    }

    public function createWithSupport(
        Speciality $speciality,
        GetDocumentsWithSupport $action,
    ): Response {
        return Inertia::render('applications/create-with-support', [
            'speciality' => $speciality->only('id', 'name', 'title', 'type', 'new_code'),
            'documentTypes' => $action($speciality)->map(fn ($dt) => [
                'id' => $dt->id,
                'code' => $dt->code,
                'description' => $dt->description,
                'price' => ($speciality->type === 1 || $dt->document_type === 2)
                    ? $dt->undergraduate_cost
                    : $dt->graduate_cost,
            ]),
            'graduate' => [
                'name' => auth()->user()->full_name,
                'dni' => auth()->user()->dni,
            ],
        ]);
    }

    public function storeWithSupport(
        StoreApplicationWithSupportRequest $request,
        Speciality $speciality,
        CreateApplicationWithSupport $action,
    ): RedirectResponse {
        $action($request->toDto($speciality));

        return to_route('dashboard');
    }
}
