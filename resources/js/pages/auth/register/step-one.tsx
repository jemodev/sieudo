import { router } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import { useFormState } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    const { isValid, isSubmitting, errors } = useFormState({ control: form.control });

    return (
        <div className="mx-auto w-full max-w-sm">
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="dni">Número de cédula</Label>
                    <Input
                        id="dni"
                        type="text"
                        autoFocus
                        tabIndex={1}
                        placeholder="12345678"
                        {...form.register('dni')}
                    />
                    <InputError message={errors.dni?.message} />
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
