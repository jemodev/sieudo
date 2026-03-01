<?php

declare(strict_types=1);

namespace App\DTOs;

readonly class LoginData
{
    public function __construct(public string $dni, public string $password) {}
}
