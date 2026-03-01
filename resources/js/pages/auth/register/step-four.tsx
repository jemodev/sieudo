import { router } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { home } from '@/routes';

export function StepFour() {
    return (
        <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
            <Alert>
                <CheckCircle className="size-4" />
                <AlertTitle>¡Registro exitoso!</AlertTitle>
                <AlertDescription>
                    Su cuenta ha sido creada exitosamente. Ya puede iniciar sesión con sus
                    credenciales.
                </AlertDescription>
            </Alert>
            <Button onClick={() => router.visit(home())}>Aceptar</Button>
        </div>
    );
}
