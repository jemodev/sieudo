import { router } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { home } from '@/routes';

export function Blocked() {
    return (
        <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
            <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Cuenta bloqueada</AlertTitle>
                <AlertDescription>
                    Ha superado el número máximo de intentos de recuperación. Por favor,
                    comuníquese con soporte a través del correo{' '}
                    <span className="font-medium">incidencias.registro.cgceudo@gmail.com</span>{' '}
                    para desbloquear su cuenta.
                </AlertDescription>
            </Alert>
            <Button onClick={() => router.visit(home())}>Aceptar</Button>
        </div>
    );
}
