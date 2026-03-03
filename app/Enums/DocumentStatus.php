<?php

declare(strict_types=1);

namespace App\Enums;

enum DocumentStatus: string
{
    case PendingPayment = '0';
    case AwaitingVerification = '1';
    case PaymentRejected = '2';
    case TranscriptionStarted = '3';
    case TranscriptionCompleted = '4';
    case PendingSignature = '5';
    case SignatureCompleted = '6';
    case UnderVerification = '7';
    case ReadyForDelivery = '8';
    case Delivered = '9';
    case Verified = '10';
    case Rejected = '11';
    case Withdrawn = '12';
    case Completed = '13';

    public function label(): string
    {
        return match ($this) {
            self::PendingPayment => 'Pendiente de pago',
            self::AwaitingVerification => 'Esperando verificación',
            self::PaymentRejected => 'Pago rechazado',
            self::TranscriptionStarted => 'Inicio de transcripción',
            self::TranscriptionCompleted => 'Transcripción completada',
            self::PendingSignature => 'En firma',
            self::SignatureCompleted => 'Firma completada',
            self::UnderVerification => 'En verificación',
            self::ReadyForDelivery => 'Listo para entrega',
            self::Delivered => 'Entregado',
            self::Verified => 'Verificado',
            self::Rejected => 'Rechazado',
            self::Withdrawn => 'Retirado',
            self::Completed => 'Completado',
        };
    }

    public function isFinalized(): bool
    {
        return (int) $this->value >= 9;
    }
}
