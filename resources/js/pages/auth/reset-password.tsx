import { Form, Head } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
    recoveryUser?: { dni: string; name: string } | null;
};

export default function ResetPassword({ token, email, recoveryUser }: Props) {
    return (
        <AuthLayout
            title="Restablecer contraseña"
            description="Ingrese su nueva contraseña a continuación"
            maxWidth="max-w-lg"
        >
            <Head title="Restablecer contraseña" />

            {recoveryUser && (
                <div className="mb-4 rounded-md border px-4 py-3 text-sm">
                    <span className="font-medium">
                        Cédula: {recoveryUser.dni}
                    </span>
                    {' — '}
                    <span>{recoveryUser.name}</span>
                </div>
            )}

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <Field>
                            <FieldLabel htmlFor="email">
                                Correo electrónico
                            </FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                className="mt-1 block w-full"
                                readOnly
                            />
                            <FieldError
                                errors={[
                                    errors.email
                                        ? { message: errors.email }
                                        : undefined,
                                ]}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password">
                                Nueva contraseña
                            </FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                className="mt-1 block w-full"
                                autoFocus
                                placeholder="Contraseña"
                            />
                            <FieldError
                                errors={[
                                    errors.password
                                        ? { message: errors.password }
                                        : undefined,
                                ]}
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password_confirmation">
                                Confirmar contraseña
                            </FieldLabel>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                autoComplete="new-password"
                                className="mt-1 block w-full"
                                placeholder="Confirmar contraseña"
                            />
                            <FieldError
                                errors={[
                                    errors.password_confirmation
                                        ? {
                                              message:
                                                  errors.password_confirmation,
                                          }
                                        : undefined,
                                ]}
                            />
                        </Field>

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing && <Spinner />}
                            Restablecer contraseña
                        </Button>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
