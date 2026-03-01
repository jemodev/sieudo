<?php

declare(strict_types=1);

namespace App\DTOs;

readonly class VerifyAnswersData
{
    public function __construct(
        public string $dni,
        public string $a1,
        public string $a2,
        public string $a3,
    ) {}
}
