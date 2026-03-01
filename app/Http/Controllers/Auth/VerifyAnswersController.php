<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\VerifySecurityAnswers;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\VerifyAnswersRequest;
use Illuminate\Http\JsonResponse;

final class VerifyAnswersController extends Controller
{
    public function __invoke(VerifyAnswersRequest $request, VerifySecurityAnswers $action): JsonResponse
    {
        $result = $action($request->toDto());

        return response()->json($result);
    }
}
