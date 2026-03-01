<?php

declare(strict_types=1);

namespace App\DTOs;

readonly class ValidateRegistrationData
{
    public function __construct(public string $email) {}
}
