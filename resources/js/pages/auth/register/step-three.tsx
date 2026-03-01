import type {UseFormReturn} from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import type {Step2Values} from '@/schemas/register';

import type {OpsuData, Question} from './types';

export function StepThree({
    form,
    opsuData,
    questions,
    isConfirming,
    onBack,
    onConfirm,
}: {
    form: UseFormReturn<Step2Values>;
    opsuData: OpsuData;
    questions: Question[];
    isConfirming: boolean;
    onBack: () => void;
    onConfirm: () => void;
}) {
    const values = form.getValues();

    return (
        <div className="flex flex-col gap-6">
            <p className="text-sm text-muted-foreground">
                Verifique sus datos antes de confirmar el registro.
            </p>

            {/* Datos personales */}
            <div className="grid grid-cols-4 gap-4 rounded-md border p-4">
                {(
                    [
                        ['Cédula', opsuData.dni],
                        ['Nombres', opsuData.nombres],
                        ['Apellidos', opsuData.apellidos],
                        ['Género', values.gender === 'F' ? 'Femenino' : 'Masculino'],
                    ] as [string, string][]
                ).map(([label, value]) => (
                    <div key={label} className="grid gap-1">
                        <span className="text-xs text-muted-foreground">{label}</span>
                        <p className="text-sm font-medium">{value}</p>
                    </div>
                ))}
            </div>

            {/* Contacto */}
            <div className="grid grid-cols-4 gap-4 rounded-md border p-4">
                <div className="col-span-2 grid gap-1">
                    <span className="text-xs text-muted-foreground">Correo electrónico</span>
                    <p className="text-sm font-medium">{values.email}</p>
                </div>
                <div className="col-span-2 grid gap-1">
                    <span className="text-xs text-muted-foreground">Teléfono</span>
                    <p className="text-sm font-medium">{values.phone}</p>
                </div>
            </div>

            {/* Preguntas de seguridad */}
            <div className="grid grid-cols-3 gap-4 rounded-md border p-4">
                {(
                    [
                        ['Pregunta de seguridad 1', values.q1_id],
                        ['Pregunta de seguridad 2', values.q2_id],
                        ['Pregunta de seguridad 3', values.q3_id],
                    ] as [string, number][]
                ).map(([label, id]) => (
                    <div key={label} className="grid gap-1">
                        <span className="text-xs text-muted-foreground">{label}</span>
                        <p className="text-sm font-medium">
                            {questions.find((q) => q.id === id)?.question ?? '—'}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
                    Regresar
                </Button>
                <Button
                    type="button"
                    className="flex-1"
                    disabled={isConfirming}
                    onClick={onConfirm}
                >
                    {isConfirming && <Spinner />}
                    Confirmar
                </Button>
            </div>
        </div>
    );
}
