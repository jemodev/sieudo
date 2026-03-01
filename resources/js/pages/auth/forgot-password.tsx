import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AuthLayout from '@/layouts/auth-layout';
import { verifyAnswers, verifyDni } from '@/routes/password';
import { step1Schema, step2Schema } from '@/schemas/forgot-password';
import type { Step1Values, Step2Values } from '@/schemas/forgot-password';

import { postJson } from './register/helpers';
import type { JsonErrorResponse } from './register/types';
import { Blocked } from './forgot-password/blocked';
import { NotFound } from './forgot-password/not-found';
import { StepAnswers } from './forgot-password/step-answers';
import { StepDni } from './forgot-password/step-dni';
import type { RecoveryData, RecoveryStep } from './forgot-password/types';

export default function ForgotPassword() {
    const [step, setStep] = useState<RecoveryStep>('step1');
    const [dni, setDni] = useState('');
    const [recoveryData, setRecoveryData] = useState<RecoveryData | null>(null);
    const [remainingAttempts, setRemainingAttempts] = useState(5);
    const [serverError, setServerError] = useState<string | null>(null);

    const step1Form = useForm<Step1Values>({
        resolver: standardSchemaResolver(step1Schema),
        mode: 'onChange',
    });

    const step2Form = useForm<Step2Values>({
        resolver: standardSchemaResolver(step2Schema),
        mode: 'onTouched',
        defaultValues: { a1: '', a2: '', a3: '' },
    });

    const handleStep1 = step1Form.handleSubmit(async ({ dni: dniValue }) => {
        const { ok, data } = await postJson(verifyDni.url(), { dni: dniValue });

        if (!ok) {
            const err = data as JsonErrorResponse;
            const type = err.errors?.type?.[0];
            if (type === 'not_found') {
                setStep('not_found');
            } else if (type === 'blocked') {
                setStep('blocked');
            }
            return;
        }

        const recovery = data as RecoveryData;
        setDni(dniValue);
        setRecoveryData(recovery);
        setRemainingAttempts(recovery.remaining_attempts);
        setServerError(null);
        setStep('step2');
    });

    const handleStep2 = step2Form.handleSubmit(async ({ a1, a2, a3 }) => {
        const { ok, data } = await postJson(verifyAnswers.url(), { dni, a1, a2, a3 });

        if (!ok) {
            const err = data as JsonErrorResponse;
            const type = err.errors?.type?.[0];

            if (type === 'blocked') {
                setStep('blocked');
                return;
            }

            const remaining = parseInt(err.errors?.remaining?.[0] ?? '0', 10);
            setRemainingAttempts(remaining);
            setServerError('Las respuestas ingresadas son incorrectas.');
            return;
        }

        const { token, email } = data as { token: string; email: string };
        router.visit(`/reset-password/${token}?email=${encodeURIComponent(email)}`);
    });

    const titles: Record<RecoveryStep, { title: string; description: string }> = {
        step1: {
            title: 'Recuperar contraseña',
            description: 'Ingrese su número de cédula para continuar',
        },
        not_found: {
            title: 'Recuperar contraseña',
            description: 'No se encontró la cédula ingresada',
        },
        step2: {
            title: 'Preguntas de seguridad',
            description: 'Responda las preguntas para verificar su identidad',
        },
        blocked: {
            title: 'Recuperar contraseña',
            description: 'Cuenta bloqueada temporalmente',
        },
    };

    const { title, description } = titles[step];

    return (
        <AuthLayout title={title} description={description} maxWidth="max-w-md">
            <Head title="Recuperar contraseña" />

            {step === 'step1' && <StepDni form={step1Form} onSubmit={handleStep1} />}
            {step === 'not_found' && <NotFound />}
            {step === 'blocked' && <Blocked />}
            {step === 'step2' && recoveryData && (
                <StepAnswers
                    form={step2Form}
                    questions={recoveryData.questions}
                    remainingAttempts={remainingAttempts}
                    serverError={serverError}
                    onBack={() => setStep('step1')}
                    onSubmit={handleStep2}
                />
            )}
        </AuthLayout>
    );
}
