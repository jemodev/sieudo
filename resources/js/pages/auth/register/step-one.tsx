import { router } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import { Controller, useFormState } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { home } from '@/routes';
import type { Step1Values } from '@/schemas/register';

export function StepOne({
    form,
    onSubmit,
}: {
    form: UseFormReturn<Step1Values>;
    onSubmit: ComponentProps<'form'>['onSubmit'];
}) {
    const { isValid, isSubmitting } = useFormState({ control: form.control });

    return (
        <div className="mx-auto w-full max-w-sm">
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <Controller
                    name="dni"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="dni">Número de cédula</FieldLabel>
                            <Input
                                {...field}
                                id="dni"
                                type="text"
                                autoFocus
                                tabIndex={1}
                                placeholder="12345678"
                                aria-invalid={fieldState.invalid}
                            />
                            <FieldError errors={[fieldState.error]} />
                        </Field>
                    )}
                />

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
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting && <Spinner />}
                        Siguiente
                    </Button>
                </div>
            </form>
        </div>
    );
}