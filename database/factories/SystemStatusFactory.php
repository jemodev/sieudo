<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\SystemStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SystemStatus>
 */
class SystemStatusFactory extends Factory
{
    protected $model = SystemStatus::class;

    public function definition(): array
    {
        return [
            'system_status' => 1,
            'application_count' => null,
            'max_applications' => null,
        ];
    }
}
