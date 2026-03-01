import { router } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { home } from '@/routes';

export function NotFound() {
    return (
        <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
            <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Cédula no encontrada</AlertTitle>
                <AlertDescription>
                    La cédula ingresada no corresponde a ningún egresado registrado en el sistema.
                </AlertDescription>
            </Alert>
            <Button onClick={() => router.visit(home())}>Aceptar</Button>
        </div>
    );
}
