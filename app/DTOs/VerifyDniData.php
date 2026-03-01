<?php

declare(strict_types=1);

namespace App\DTOs;

readonly class VerifyDniData
{
    public function __construct(public string $dni) {}
}
