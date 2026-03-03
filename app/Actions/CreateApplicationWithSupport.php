<?php

declare(strict_types=1);

namespace App\Actions;

use App\DTOs\StoreApplicationData;
use App\Enums\DocumentStatus;
use App\Models\Application;
use App\Models\DocumentType;
use App\Models\SystemStatus;
use Illuminate\Support\Facades\DB;

final class CreateApplicationWithSupport
{
    public function __invoke(StoreApplicationData $data): Application
    {
        return DB::transaction(function () use ($data): Application {
            $documentTypes = DocumentType::query()
                ->whereIn('code', $data->documentTypeCodes)
                ->get()
                ->keyBy('code');

            $docCount = $documentTypes->count();

            $appCode = str_pad($data->graduateId, 8, '0', STR_PAD_LEFT)
                .now()->format('dmY')
                .'1'
                .'0'
                .str_pad((string) $docCount, 2, '0', STR_PAD_LEFT)
                .$data->specialityNewCode;

            $total = $documentTypes->sum(fn (DocumentType $dt): float => ($data->specialityType === 1 || $dt->document_type === 2)
                ? $dt->undergraduate_cost
                : $dt->graduate_cost);

            $application = Application::query()->create([
                'user_id' => $data->userId,
                'speciality_id' => $data->specialityId,
                'code' => $appCode,
                'specialty_code' => $data->specialityNewCode,
                'application_date' => now(),
                'graduate_id' => $data->graduateId,
                'status' => '0',
                'priority' => false,
                'document_count' => $docCount,
                'document_support' => true,
                'amount' => (string) $total,
            ]);

            foreach ($data->documentTypeCodes as $position => $code) {
                $docType = $documentTypes->get($code);

                if ($docType === null) {
                    continue;
                }

                $pos = $position + 1;
                $docCode = $appCode.$docType->code.str_pad((string) $pos, 2, '0', STR_PAD_LEFT);

                $application->documents()->create([
                    'document_type_id' => $docType->id,
                    'specialty_id' => $data->specialityId,
                    'code' => $docCode,
                    'type' => $docType->document_type,
                    'graduate_id' => $data->graduateId,
                    'specialty_code' => $data->specialityNewCode,
                    'support' => true,
                    'status' => DocumentStatus::PendingPayment,
                    'quantity' => (string) $docCount,
                    'document_application_position' => str_pad((string) $pos, 2, '0', STR_PAD_LEFT),
                ]);
            }

            $status = SystemStatus::query()->latest()->first();

            if ($status !== null) {
                $newCount = $status->application_count + 1;
                $status->application_count = $newCount;

                if ($status->max_applications !== null && $newCount >= $status->max_applications) {
                    $status->system_status = '3';
                }

                $status->save();
            }

            return $application;
        });
    }
}
