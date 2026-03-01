<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\VerifyGraduateDni;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\VerifyDniRequest;
use Illuminate\Http\JsonResponse;

final class VerifyDniController extends Controller
{
    public function __invoke(VerifyDniRequest $request, VerifyGraduateDni $action): JsonResponse
    {
        $opsuData = $action($request->toDto());

        return response()->json($opsuData);
    }
}
