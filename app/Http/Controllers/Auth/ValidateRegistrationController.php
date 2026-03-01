<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\ValidateRegistrationStep;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ValidateRegistrationRequest;
use Illuminate\Http\JsonResponse;

final class ValidateRegistrationController extends Controller
{
    public function __invoke(ValidateRegistrationRequest $request, ValidateRegistrationStep $action): JsonResponse
    {
        $action($request->toDto());

        return response()->json(['ok' => true]);
    }
}
