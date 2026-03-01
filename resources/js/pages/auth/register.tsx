import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import AuthLayout from '@/layouts/auth-layout';
import { store, validate, verifyDni } from '@/routes/register';
import { step1Schema, step2Schema } from '@/schemas/register';
import type { Step1Values, Step2Values } from '@/schemas/register';

import { AlreadyRegistered } from './register/already-registered';
import { postJson } from './register/helpers';
import { NotFound } from './register/not-found';
import { StepFour } from './register/step-four';
import { StepOne } from './register/step-one';
import { StepThree } from './register/step-three';
import { StepTwo } from './register/step-two';
import type { JsonErrorResponse, OpsuData, Question, StepNumber, WizardStep } from './register/types';
import { WizardNav } from './register/wizard-nav';

type Props = {
    questions: Question[];
};

export default function Register({ questions }: Props) {
    const [step, setStep] = useState<WizardStep>('step1');
    const [opsuData, setOpsuData] = useState<OpsuData | null>(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [maxReachedStep, setMaxReachedStep] = useState<StepNumber>(1);

    const step1Form = useForm<Step1Values>({ resolver: standardSchemaResolver(step1Schema), mode: 'onChange' });
    const step2Form = useForm<Step2Values>({
        resolver: standardSchemaResolver(step2Schema),
        mode: 'onTouched',
        defaultValues: {
            q1_answer: '',
            q2_answer: '',
            q3_answer: '',
        },
    });

    const currentStepNumber: StepNumber =
        step === 'step2' ? 2 : step === 'step3' ? 3 : step === 'step4' ? 4 : 1;

    const navigateToStep = (stepNum: StepNumber) => {
        if (stepNum === 1) setStep('step1');
        else if (stepNum === 2) setStep('step2');
        else if (stepNum === 3) setStep('step3');
    };

    const handleStep1 = step1Form.handleSubmit(async ({ dni }) => {
        const { ok, data } = await postJson(verifyDni.url(), { dni });

        if (!ok) {
            const err = data as JsonErrorResponse;
            const type = err.errors?.type?.[0];
            if (type === 'not_found') setStep('not_found');
            else if (type === 'already_registered') setStep('already_registered');
            return;
        }

        const opsu = data as OpsuData;
        setOpsuData(opsu);
        step2Form.reset({
            gender: opsu.sexo as 'M' | 'F',
            email: opsu.correo ?? '',
            phone: opsu.telefono ?? '',
            q1_answer: '',
            q2_answer: '',
            q3_answer: '',
        });
        setMaxReachedStep((prev) => Math.max(prev, 2) as StepNumber);
        setStep('step2');
    });

    const handleStep2 = step2Form.handleSubmit(async ({ email }) => {
        const { ok, data } = await postJson(validate.url(), { email });

        if (!ok) {
            const err = data as JsonErrorResponse;
            const message = err.errors?.email?.[0] ?? 'El correo ya está registrado.';
            step2Form.setError('email', { message });
            return;
        }

        setMaxReachedStep((prev) => Math.max(prev, 3) as StepNumber);
        setStep('step3');
    });

    const handleConfirm = async () => {
        if (!opsuData) return;

        setIsConfirming(true);

        const values = step2Form.getValues();
        const { ok, data } = await postJson(store.url(), {
            dni: opsuData.dni,
            name: opsuData.nombres,
            surname: opsuData.apellidos,
            gender: values.gender,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
            phone: values.phone,
            q1_id: values.q1_id,
            q1_answer: values.q1_answer,
            q2_id: values.q2_id,
            q2_answer: values.q2_answer,
            q3_id: values.q3_id,
            q3_answer: values.q3_answer,
        });

        setIsConfirming(false);

        if (ok) {
            setMaxReachedStep(4);
            setStep('step4');
            return;
        }

        const err = data as JsonErrorResponse;
        if (err.errors?.email) {
            step2Form.setError('email', { message: err.errors.email[0] });
            setStep('step2');
        }
    };

    return (
        <AuthLayout
            title="Registro de egresado"
            description="Complete el proceso para crear su cuenta"
            maxWidth="max-w-7xl"
        >
            <Head title="Registro" />

            <WizardNav
                currentStep={currentStepNumber}
                maxReachedStep={maxReachedStep}
                onNavigate={navigateToStep}
            />

            {step === 'step1' && <StepOne form={step1Form} onSubmit={handleStep1} />}
            {step === 'not_found' && <NotFound />}
            {step === 'already_registered' && <AlreadyRegistered />}
            {step === 'step2' && opsuData && (
                <StepTwo
                    form={step2Form}
                    opsuData={opsuData}
                    questions={questions}
                    onBack={() => setStep('step1')}
                    onSubmit={handleStep2}
                />
            )}
            {step === 'step3' && opsuData && (
                <StepThree
                    form={step2Form}
                    opsuData={opsuData}
                    questions={questions}
                    isConfirming={isConfirming}
                    onBack={() => setStep('step2')}
                    onConfirm={handleConfirm}
                />
            )}
            {step === 'step4' && <StepFour />}
        </AuthLayout>
    );
}
