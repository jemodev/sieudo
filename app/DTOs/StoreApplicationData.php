<?php

declare(strict_types=1);

namespace App\DTOs;

readonly class StoreApplicationData
{
    /**
     * @param  string[]  $documentTypeCodes
     */
    public function __construct(
        public int $userId,
        public string $graduateId,
        public int $specialityId,
        public string $specialityNewCode,
        public int $specialityType,
        public array $documentTypeCodes,
    ) {}
}
