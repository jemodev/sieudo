import type { ComponentProps } from 'react';
import { Controller, useFormState, useWatch } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
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
    const { isSubmitting } = useFormState({ control: form.control });

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
                <Field>
                    <FieldLabel>Cédula</FieldLabel>
                    <Input value={opsuData.dni} readOnly className="bg-muted" />
                </Field>
                <Field>
                    <FieldLabel>Nombres</FieldLabel>
                    <Input value={opsuData.nombres} readOnly className="bg-muted" />
                </Field>
                <Field>
                    <FieldLabel>Apellidos</FieldLabel>
                    <Input value={opsuData.apellidos} readOnly className="bg-muted" />
                </Field>
                <Controller
                    name="gender"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="gender">Género</FieldLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger id="gender" aria-invalid={fieldState.invalid}>
                                    <SelectValue placeholder="Seleccione..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="F">Femenino</SelectItem>
                                    <SelectItem value="M">Masculino</SelectItem>
                                </SelectContent>
                            </Select>
                            <FieldError errors={[fieldState.error]} />
                        </Field>
                    )}
                />
            </div>

            {/* Fila 2: contacto y contraseñas */}
            <div className="grid grid-cols-4 gap-4">
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                            <Input
                                {...field}
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                aria-invalid={fieldState.invalid}
                            />
                            <FieldError errors={[fieldState.error]} />
                        </Field>
                    )}
                />
                <Controller
                    name="phone"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                            <Input
                                {...field}
                                id="phone"
                                type="text"
                                placeholder="04141234567"
                                aria-invalid={fieldState.invalid}
                            />
                            <FieldError errors={[fieldState.error]} />
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                            <Input
                                {...field}
                                id="password"
                                type="password"
                                placeholder="Contraseña"
                                aria-invalid={fieldState.invalid}
                            />
                            <FieldError errors={[fieldState.error]} />
                        </Field>
                    )}
                />
                <Controller
                    name="password_confirmation"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="password_confirmation">
                                Confirmar contraseña
                            </FieldLabel>
                            <Input
                                {...field}
                                id="password_confirmation"
                                type="password"
                                placeholder="Confirmar contraseña"
                                aria-invalid={fieldState.invalid}
                            />
                            <FieldError errors={[fieldState.error]} />
                        </Field>
                    )}
                />
            </div>

            {/* Preguntas de seguridad: 3 columnas, cada una con su pregunta y respuesta */}
            <div className="grid grid-cols-3 gap-4">
                {/* Columna 1 */}
                <div className="flex flex-col gap-3 self-start">
                    <Controller
                        name="q1_id"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Pregunta de seguridad 1</FieldLabel>
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
                                    <SelectTrigger aria-invalid={fieldState.invalid}>
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
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />
                    <Controller
                        name="q1_answer"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Respuesta 1</FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Su respuesta"
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />
                </div>

                {/* Columna 2 */}
                <div className={cn('flex flex-col gap-3 self-start', !q2Enabled && 'pointer-events-none opacity-50')}>
                    <Controller
                        name="q2_id"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Pregunta de seguridad 2</FieldLabel>
                                <Select
                                    value={field.value?.toString()}
                                    onValueChange={(v) => {
                                        field.onChange(Number(v));
                                        form.resetField('q2_answer');
                                        form.resetField('q3_id');
                                        form.resetField('q3_answer');
                                    }}
                                >
                                    <SelectTrigger aria-invalid={fieldState.invalid}>
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
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />
                    <Controller
                        name="q2_answer"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Respuesta 2</FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Su respuesta"
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />
                </div>

                {/* Columna 3 */}
                <div className={cn('flex flex-col gap-3 self-start', !q3Enabled && 'pointer-events-none opacity-50')}>
                    <Controller
                        name="q3_id"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Pregunta de seguridad 3</FieldLabel>
                                <Select
                                    value={field.value?.toString()}
                                    onValueChange={(v) => field.onChange(Number(v))}
                                >
                                    <SelectTrigger aria-invalid={fieldState.invalid}>
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
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />
                    <Controller
                        name="q3_answer"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Respuesta 3</FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Su respuesta"
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />
                </div>
            </div>

            <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
                    Regresar
                </Button>
                <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                >
                    {isSubmitting && <Spinner />}
                    Siguiente
                </Button>
            </div>
        </form>
    );
}
