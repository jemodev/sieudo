<?php

declare(strict_types=1);

namespace App\DTOs;

readonly class RegisterUserData
{
    public function __construct(
        public string $dni,
        public string $name,
        public string $surname,
        public string $gender,
        public string $email,
        public string $password,
        public string $phone,
        public int $q1Id,
        public string $q1Answer,
        public int $q2Id,
        public string $q2Answer,
        public int $q3Id,
        public string $q3Answer,
    ) {}
}
