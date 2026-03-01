<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\VerifyRecoveryDni;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RecoverPasswordRequest;
use Illuminate\Http\JsonResponse;

final class RecoverPasswordController extends Controller
{
    public function __invoke(RecoverPasswordRequest $request, VerifyRecoveryDni $action): JsonResponse
    {
        $result = $action($request->toDto());

        return response()->json($result);
    }
}
