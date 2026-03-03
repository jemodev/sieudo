<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Application;
use App\Models\Document;
use App\Models\User;
use Illuminate\Support\Collection;

final class GetApplicationsInProcess
{
    /** @var string[] */
    private array $statuses = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

    /**
     * @return Collection<int, array{id: int, code: string, specialityTitle: string, documentSupport: bool, amount: string, status: string, documents: Collection<int, array{id: int, code: string, description: string}>}>
     */
    public function __invoke(User $user): Collection
    {
        return Application::query()
            ->with([
                'speciality:id,new_code,title,name',
                'documents.documentType:id,description',
            ])
            ->whereBelongsTo($user)
            ->whereIn('status', $this->statuses)
            ->latest('application_date')
            ->get()
            ->map(fn (Application $application) => [
                'id' => $application->id,
                'code' => $application->code,
                'specialityTitle' => $application->speciality->title ?? $application->speciality->name ?? '',
                'documentSupport' => $application->document_support,
                'amount' => $application->amount,
                'status' => $application->status,
                'documents' => $application->documents->map(fn (Document $document) => [
                    'id' => $document->id,
                    'code' => $document->code,
                    'description' => $document->documentType->description ?? '',
                ])->values(),
            ]);
    }
}
