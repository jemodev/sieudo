import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { AlertCircle, Check, CheckCircle } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import { store, validate, verifyDni } from '@/routes/register';

type Props = {
    questions: { id: number; question: string }[];
};

type WizardStep =
    | 'step1'
    | 'not_found'
    | 'already_registered'
    | 'step2'
    | 'step3'
    | 'step4';

type StepNumber = 1 | 2 | 3 | 4;

type OpsuData = {
    dni: string;
    nombres: string;
    apellidos: string;
    sexo: string;
    correo: string;
    telefono: string;
};

type JsonErrorResponse = {
    errors?: Record<string, string[]>;
    message?: string;
};

const WIZARD_STEPS: { number: StepNumber; label: string }[] = [
    { number: 1, label: 'Verificación' },
    { number: 2, label: 'Datos' },
    { number: 3, label: 'Confirmación' },
    { number: 4, label: 'Completado' },
];

const step1Schema = z.object({
    dni: z.string().regex(/^\d{6,12}$/, 'Debe tener entre 6 y 12 dígitos'),
});

const step2Schema = z
    .object({
        gender: z.enum(['M', 'F'], { message: 'Seleccione un género' }),
        email: z.string().email('Correo electrónico inválido'),
        password: z.string().min(8, 'Mínimo 8 caracteres').max(20, 'Máximo 20 caracteres'),
        password_confirmation: z.string(),
        phone: z
            .string()
            .regex(
                /^(0414|0424|0416|0426|0412|0422)-?\d{7}$/,
                'Teléfono venezolano inválido',
            ),
        q1_id: z.number({ message: 'Seleccione una pregunta' }).int().positive(),
        q1_answer: z.string().min(1, 'Ingrese su respuesta'),
        q2_id: z.number({ message: 'Seleccione una pregunta' }).int().positive(),
        q2_answer: z.string().min(1, 'Ingrese su respuesta'),
        q3_id: z.number({ message: 'Seleccione una pregunta' }).int().positive(),
        q3_answer: z.string().min(1, 'Ingrese su respuesta'),
    })
    .refine((d) => d.password === d.password_confirmation, {
        message: 'Las contraseñas no coinciden',
        path: ['password_confirmation'],
    });

type Step1Values = z.infer<typeof step1Schema>;
type Step2Values = z.infer<typeof step2Schema>;

function getCsrfToken(): string {
    return decodeURIComponent(
        document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1] ?? '',
    );
}

async function postJson(url: string, body: unknown): Promise<{ ok: boolean; data: unknown }> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCsrfToken(),
            Accept: 'application/json',
        },
        body: JSON.stringify(body),
    });

    const text = await res.text();
    const data: unknown = text ? JSON.parse(text) : null;

    return { ok: res.ok, data };
}

function WizardNav({
    currentStep,
    maxReachedStep,
    onNavigate,
}: {
    currentStep: StepNumber;
    maxReachedStep: StepNumber;
    onNavigate: (step: StepNumber) => void;
}) {
    return (
        <nav className="mb-8 flex items-start">
            {WIZARD_STEPS.map((wizardStep, index) => {
                const isCompleted = wizardStep.number < currentStep;
                const isActive = wizardStep.number === currentStep;
                const isReachable =
                    wizardStep.number <= maxReachedStep &&
                    wizardStep.number !== currentStep &&
                    currentStep !== 4 &&
                    wizardStep.number !== 4;
                const showConnector = index < WIZARD_STEPS.length - 1;

                return (
                    <Fragment key={wizardStep.number}>
                        <button
                            type="button"
                            onClick={() => isReachable && onNavigate(wizardStep.number)}
                            disabled={!isReachable}
                            className={cn(
                                'flex flex-col items-center gap-2',
                                isReachable ? 'cursor-pointer' : 'cursor-default',
                            )}
                        >
                            <div
                                className={cn(
                                    'flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all',
                                    isCompleted &&
                                        'border-primary bg-primary text-primary-foreground',
                                    isActive &&
                                        'border-primary bg-primary text-primary-foreground shadow-[0_0_0_4px] shadow-primary/20',
                                    !isCompleted &&
                                        !isActive &&
                                        isReachable &&
                                        'border-primary/60 bg-background text-primary',
                                    !isCompleted &&
                                        !isActive &&
                                        !isReachable &&
                                        'border-border bg-muted text-muted-foreground',
                                )}
                            >
                                {isCompleted ? <Check className="size-4" /> : wizardStep.number}
                            </div>
                            <span
                                className={cn(
                                    'text-xs font-medium',
                                    isActive && 'text-foreground',
                                    isCompleted && 'text-primary',
                                    !isActive && !isCompleted && 'text-muted-foreground',
                                )}
                            >
                                {wizardStep.label}
                            </span>
                        </button>

                        {showConnector && (
                            <div
                                className={cn(
                                    'mt-4 h-0.5 flex-1 rounded-full transition-colors',
                                    isCompleted ? 'bg-primary' : 'bg-border',
                                )}
                            />
                        )}
                    </Fragment>
                );
            })}
        </nav>
    );
}

export default function Register({ questions }: Props) {
    const [step, setStep] = useState<WizardStep>('step1');
    const [opsuData, setOpsuData] = useState<OpsuData | null>(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [maxReachedStep, setMaxReachedStep] = useState<StepNumber>(1);

    const step1Form = useForm<Step1Values>({ resolver: zodResolver(step1Schema) });
    const step2Form = useForm<Step2Values>({ resolver: zodResolver(step2Schema) });

    // eslint-disable-next-line react-hooks/incompatible-library
    const q1Id = step2Form.watch('q1_id');
    // eslint-disable-next-line react-hooks/incompatible-library
    const q1Answer = step2Form.watch('q1_answer');
    // eslint-disable-next-line react-hooks/incompatible-library
    const q2Id = step2Form.watch('q2_id');
    // eslint-disable-next-line react-hooks/incompatible-library
    const q2Answer = step2Form.watch('q2_answer');

    const q2Enabled = !!q1Id && !!q1Answer?.trim();
    const q3Enabled = !!q2Id && !!q2Answer?.trim();

    const availableQ2 = questions.filter((q) => q.id !== q1Id);
    const availableQ3 = questions.filter((q) => q.id !== q1Id && q.id !== q2Id);

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
            if (type === 'not_found') {
                setStep('not_found');
            } else if (type === 'already_registered') {
                setStep('already_registered');
            }
            return;
        }

        const opsu = data as OpsuData;
        setOpsuData(opsu);
        step2Form.reset({
            gender: opsu.sexo as 'M' | 'F',
            email: opsu.correo ?? '',
            phone: opsu.telefono ?? '',
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
        if (!opsuData) {
            return;
        }

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

            {step === 'step1' && (
                <div className="mx-auto w-full max-w-sm">
                    <form onSubmit={handleStep1} className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="dni">Número de cédula</Label>
                            <Input
                                id="dni"
                                type="text"
                                autoFocus
                                tabIndex={1}
                                placeholder="12345678"
                                {...step1Form.register('dni')}
                            />
                            <InputError message={step1Form.formState.errors.dni?.message} />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => router.visit(home())}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={step1Form.formState.isSubmitting}
                            >
                                {step1Form.formState.isSubmitting && <Spinner />}
                                Siguiente
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {step === 'not_found' && (
                <div className="mx-auto w-full max-w-sm flex flex-col gap-4">
                    <Alert variant="destructive">
                        <AlertCircle className="size-4" />
                        <AlertTitle>Cédula no encontrada</AlertTitle>
                        <AlertDescription>
                            La cédula ingresada no corresponde a ningún egresado registrado en el
                            sistema.
                        </AlertDescription>
                    </Alert>
                    <Button onClick={() => router.visit(home())}>Aceptar</Button>
                </div>
            )}

            {step === 'already_registered' && (
                <div className="mx-auto w-full max-w-sm flex flex-col gap-4">
                    <Alert variant="destructive">
                        <AlertCircle className="size-4" />
                        <AlertTitle>Cuenta existente</AlertTitle>
                        <AlertDescription>
                            Ya existe una cuenta registrada con esta cédula. Si olvidó su
                            contraseña, puede recuperarla desde la pantalla de inicio.
                        </AlertDescription>
                    </Alert>
                    <Button onClick={() => router.visit(home())}>Aceptar</Button>
                </div>
            )}

            {step === 'step2' && opsuData && (
                <form onSubmit={handleStep2} className="flex flex-col gap-6">
                    {/* Fila 1: datos OPSU (read-only) + género */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="grid gap-2">
                            <Label>Cédula</Label>
                            <Input value={opsuData.dni} readOnly className="bg-muted" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Nombres</Label>
                            <Input value={opsuData.nombres} readOnly className="bg-muted" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Apellidos</Label>
                            <Input value={opsuData.apellidos} readOnly className="bg-muted" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="gender">Género</Label>
                            <Controller
                                name="gender"
                                control={step2Form.control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger id="gender">
                                            <SelectValue placeholder="Seleccione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="F">Femenino</SelectItem>
                                            <SelectItem value="M">Masculino</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <InputError message={step2Form.formState.errors.gender?.message} />
                        </div>
                    </div>

                    {/* Fila 2: contacto y contraseñas */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                {...step2Form.register('email')}
                            />
                            <InputError message={step2Form.formState.errors.email?.message} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                                id="phone"
                                type="text"
                                placeholder="04141234567"
                                {...step2Form.register('phone')}
                            />
                            <InputError message={step2Form.formState.errors.phone?.message} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Contraseña"
                                {...step2Form.register('password')}
                            />
                            <InputError message={step2Form.formState.errors.password?.message} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                placeholder="Confirmar contraseña"
                                {...step2Form.register('password_confirmation')}
                            />
                            <InputError
                                message={
                                    step2Form.formState.errors.password_confirmation?.message
                                }
                            />
                        </div>
                    </div>

                    {/* Preguntas de seguridad: 3 columnas, cada una con su pregunta y respuesta */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Columna 1 */}
                        <div className="grid gap-2 self-start">
                            <Label>Pregunta de seguridad 1</Label>
                            <Controller
                                name="q1_id"
                                control={step2Form.control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value?.toString()}
                                        onValueChange={(v) => {
                                            field.onChange(Number(v));
                                            step2Form.resetField('q1_answer');
                                            step2Form.resetField('q2_id');
                                            step2Form.resetField('q2_answer');
                                            step2Form.resetField('q3_id');
                                            step2Form.resetField('q3_answer');
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione una pregunta..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {questions.map((q) => (
                                                <SelectItem key={q.id} value={q.id.toString()}>
                                                    {q.question}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <InputError message={step2Form.formState.errors.q1_id?.message} />
                            <Label>Respuesta 1</Label>
                            <Input placeholder="Su respuesta" {...step2Form.register('q1_answer')} />
                            <InputError message={step2Form.formState.errors.q1_answer?.message} />
                        </div>

                        {/* Columna 2 */}
                        <div className="grid gap-2 self-start">
                            <Label>Pregunta de seguridad 2</Label>
                            <Controller
                                name="q2_id"
                                control={step2Form.control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value?.toString()}
                                        onValueChange={(v) => {
                                            field.onChange(Number(v));
                                            step2Form.resetField('q2_answer');
                                            step2Form.resetField('q3_id');
                                            step2Form.resetField('q3_answer');
                                        }}
                                        disabled={!q2Enabled}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione una pregunta..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableQ2.map((q) => (
                                                <SelectItem key={q.id} value={q.id.toString()}>
                                                    {q.question}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <InputError message={step2Form.formState.errors.q2_id?.message} />
                            <Label>Respuesta 2</Label>
                            <Input
                                placeholder="Su respuesta"
                                disabled={!q2Enabled}
                                {...step2Form.register('q2_answer')}
                            />
                            <InputError message={step2Form.formState.errors.q2_answer?.message} />
                        </div>

                        {/* Columna 3 */}
                        <div className="grid gap-2 self-start">
                            <Label>Pregunta de seguridad 3</Label>
                            <Controller
                                name="q3_id"
                                control={step2Form.control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value?.toString()}
                                        onValueChange={(v) => field.onChange(Number(v))}
                                        disabled={!q3Enabled}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione una pregunta..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableQ3.map((q) => (
                                                <SelectItem key={q.id} value={q.id.toString()}>
                                                    {q.question}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <InputError message={step2Form.formState.errors.q3_id?.message} />
                            <Label>Respuesta 3</Label>
                            <Input
                                placeholder="Su respuesta"
                                disabled={!q3Enabled}
                                {...step2Form.register('q3_answer')}
                            />
                            <InputError message={step2Form.formState.errors.q3_answer?.message} />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setStep('step1')}
                        >
                            Regresar
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={step2Form.formState.isSubmitting}
                        >
                            {step2Form.formState.isSubmitting && <Spinner />}
                            Siguiente
                        </Button>
                    </div>
                </form>
            )}

            {step === 'step3' && opsuData && (
                <div className="mx-auto w-full max-w-sm flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground">
                        Verifique sus datos antes de confirmar el registro.
                    </p>
                    <div className="grid gap-2 rounded-md border p-4 text-sm">
                        {(
                            [
                                ['Cédula', opsuData.dni],
                                ['Nombres', opsuData.nombres],
                                ['Apellidos', opsuData.apellidos],
                                [
                                    'Género',
                                    step2Form.getValues('gender') === 'F'
                                        ? 'Femenino'
                                        : 'Masculino',
                                ],
                                ['Correo', step2Form.getValues('email')],
                                ['Teléfono', step2Form.getValues('phone')],
                            ] as [string, string][]
                        ).map(([label, value]) => (
                            <div key={label} className="flex justify-between gap-4">
                                <span className="text-muted-foreground">{label}</span>
                                <span className="font-medium">{value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setStep('step2')}
                        >
                            Regresar
                        </Button>
                        <Button
                            type="button"
                            className="flex-1"
                            disabled={isConfirming}
                            onClick={handleConfirm}
                        >
                            {isConfirming && <Spinner />}
                            Confirmar
                        </Button>
                    </div>
                </div>
            )}

            {step === 'step4' && (
                <div className="mx-auto w-full max-w-sm flex flex-col gap-4">
                    <Alert>
                        <CheckCircle className="size-4" />
                        <AlertTitle>¡Registro exitoso!</AlertTitle>
                        <AlertDescription>
                            Su cuenta ha sido creada exitosamente. Ya puede iniciar sesión con sus
                            credenciales.
                        </AlertDescription>
                    </Alert>
                    <Button onClick={() => router.visit(home())}>Aceptar</Button>
                </div>
            )}
        </AuthLayout>
    );
}
