import type { ComponentProps } from 'react';
import { Controller, useFormState, useWatch } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import InputError from '@/components/input-error';
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
import type { Step2Values } from '@/schemas/register';

import type { OpsuData, Question } from './types';

export function StepTwo({
    form,
    opsuData,
    questions,
    onBack,
    onSubmit,
}: {
    form: UseFormReturn<Step2Values>;
    opsuData: OpsuData;
    questions: Question[];
    onBack: () => void;
    onSubmit: ComponentProps<'form'>['onSubmit'];
}) {
    const { isValid, isSubmitting } = useFormState({ control: form.control });

    const q1Id = useWatch({ control: form.control, name: 'q1_id' });
    const q1Answer = useWatch({ control: form.control, name: 'q1_answer' });
    const q2Id = useWatch({ control: form.control, name: 'q2_id' });
    const q2Answer = useWatch({ control: form.control, name: 'q2_answer' });

    const q2Enabled = !!q1Id && !!q1Answer?.trim();
    const q3Enabled = !!q2Id && !!q2Answer?.trim();

    const availableQ2 = questions.filter((q) => q.id !== q1Id);
    const availableQ3 = questions.filter((q) => q.id !== q1Id && q.id !== q2Id);

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
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
                        control={form.control}
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
                    <InputError message={form.formState.errors.gender?.message} />
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
                        {...form.register('email')}
                    />
                    <InputError message={form.formState.errors.email?.message} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                        id="phone"
                        type="text"
                        placeholder="04141234567"
                        {...form.register('phone')}
                    />
                    <InputError message={form.formState.errors.phone?.message} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        {...form.register('password')}
                    />
                    <InputError message={form.formState.errors.password?.message} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        placeholder="Confirmar contraseña"
                        {...form.register('password_confirmation')}
                    />
                    <InputError
                        message={form.formState.errors.password_confirmation?.message}
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
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                value={field.value?.toString()}
                                onValueChange={(v) => {
                                    field.onChange(Number(v));
                                    form.resetField('q1_answer');
                                    form.resetField('q2_id');
                                    form.resetField('q2_answer');
                                    form.resetField('q3_id');
                                    form.resetField('q3_answer');
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
                    <InputError message={form.formState.errors.q1_id?.message} />
                    <Label>Respuesta 1</Label>
                    <Input placeholder="Su respuesta" {...form.register('q1_answer')} />
                    <InputError message={form.formState.errors.q1_answer?.message} />
                </div>

                {/* Columna 2 */}
                <div className="grid gap-2 self-start">
                    <Label>Pregunta de seguridad 2</Label>
                    <Controller
                        name="q2_id"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                value={field.value?.toString()}
                                onValueChange={(v) => {
                                    field.onChange(Number(v));
                                    form.resetField('q2_answer');
                                    form.resetField('q3_id');
                                    form.resetField('q3_answer');
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
                    <InputError message={form.formState.errors.q2_id?.message} />
                    <Label>Respuesta 2</Label>
                    <Input
                        placeholder="Su respuesta"
                        disabled={!q2Enabled}
                        {...form.register('q2_answer')}
                    />
                    <InputError message={form.formState.errors.q2_answer?.message} />
                </div>

                {/* Columna 3 */}
                <div className="grid gap-2 self-start">
                    <Label>Pregunta de seguridad 3</Label>
                    <Controller
                        name="q3_id"
                        control={form.control}
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
                    <InputError message={form.formState.errors.q3_id?.message} />
                    <Label>Respuesta 3</Label>
                    <Input
                        placeholder="Su respuesta"
                        disabled={!q3Enabled}
                        {...form.register('q3_answer')}
                    />
                    <InputError message={form.formState.errors.q3_answer?.message} />
                </div>
            </div>

            <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
                    Regresar
                </Button>
                <Button
                    type="submit"
                    className="flex-1"
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting && <Spinner />}
                    Siguiente
                </Button>
            </div>
        </form>
    );
}
