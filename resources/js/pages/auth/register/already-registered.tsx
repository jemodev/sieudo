import { router } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { home } from '@/routes';

export function AlreadyRegistered() {
    return (
        <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
            <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Cuenta existente</AlertTitle>
                <AlertDescription>
                    Ya existe una cuenta registrada con esta cédula. Si olvidó su contraseña, puede
                    recuperarla desde la pantalla de inicio.
                </AlertDescription>
            </Alert>
            <Button onClick={() => router.visit(home())}>Aceptar</Button>
        </div>
    );
}
