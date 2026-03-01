import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Blocked } from './forgot-password/blocked';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <AuthLayout
            title="Iniciar sesión"
            description="Ingrsa tu número de cédula y tu contraseña para entrar"
        >
            <Head title="Iniciar sesión" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        {errors.blocked ? (
                            <Blocked />
                        ) : (
                            <div className="grid gap-6">
                                <Field>
                                    <FieldLabel htmlFor="dni">Cédula de identidad</FieldLabel>
                                    <Input
                                        id="dni"
                                        type="text"
                                        name="dni"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="username"
                                        placeholder="12345678"
                                    />
                                    <FieldError>{errors.dni}</FieldError>
                                </Field>

                                <Field>
                                    <div className="flex items-center">
                                        <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="ml-auto text-sm"
                                                tabIndex={5}
                                            >
                                                Olvidó su contraseña?
                                            </TextLink>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Contraseña"
                                    />
                                    <FieldError>{errors.password}</FieldError>
                                </Field>

                                <Button
                                    type="submit"
                                    className="mt-4 w-full"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    Entrar
                                </Button>
                            </div>
                        )}

                        {canRegister && (
                            <div className="text-center text-sm text-muted-foreground">
                                No tiene una cuenta?{' '}
                                <TextLink href={register()} tabIndex={5}>
                                    Regístrese
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
