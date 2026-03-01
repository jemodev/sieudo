import { AlertCircle } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Controller, useFormState } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import type { Step2Values } from '@/schemas/forgot-password';

import type { QuestionData } from './types';

export function StepAnswers({
    form,
    questions,
    remainingAttempts,
    serverError,
    onBack,
    onSubmit,
}: {
    form: UseFormReturn<Step2Values>;
    questions: QuestionData[];
    remainingAttempts: number;
    serverError: string | null;
    onBack: () => void;
    onSubmit: ComponentProps<'form'>['onSubmit'];
}) {
    const { isSubmitting } = useFormState({ control: form.control });

    const answerFields = [
        { name: 'a1' as const, question: questions[0]?.question ?? '' },
        { name: 'a2' as const, question: questions[1]?.question ?? '' },
        { name: 'a3' as const, question: questions[2]?.question ?? '' },
    ];

    return (
        <div className="mx-auto w-full max-w-sm">
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                {serverError !== null && (
                    <Alert variant="destructive">
                        <AlertCircle className="size-4" />
                        <AlertTitle>{serverError}</AlertTitle>
                        <AlertDescription>
                            Le quedan {remainingAttempts} intento{remainingAttempts !== 1 ? 's' : ''} restante{remainingAttempts !== 1 ? 's' : ''}.
                        </AlertDescription>
                    </Alert>
                )}

                {answerFields.map(({ name, question }) => (
                    <Controller
                        key={name}
                        name={name}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={name}>{question}</FieldLabel>
                                <Input
                                    {...field}
                                    id={name}
                                    type="text"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                />
                                <FieldError errors={[fieldState.error]} />
                            </Field>
                        )}
                    />
                ))}

                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={onBack}
                    >
                        Regresar
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <Spinner />}
                        Verificar
                    </Button>
                </div>
            </form>
        </div>
    );
}
