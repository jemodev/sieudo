import { Link } from '@inertiajs/react';
import { AlertTriangle, FileText } from 'lucide-react';
import { create } from '@/actions/App/Http/Controllers/ApplicationController';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Speciality {
    id: number;
    code: string;
    name: string;
    title: string;
    type: number;
    health_type: string | null;
}

interface Props {
    specialities: Speciality[];
    systemStatus: number;
}

const SYSTEM_STATUS_NORMAL = 1;

const specialityTypeBadge = (type: number) => {
    const isPostgrado = type === 2;
    return (
        <Badge variant={isPostgrado ? 'secondary' : 'outline'}>
            {isPostgrado ? 'Postgrado' : 'Pregrado'}
        </Badge>
    );
}

export default function DocumentRequestSection({ specialities, systemStatus }: Props) {
    const isSystemNormal = systemStatus === SYSTEM_STATUS_NORMAL;

    return (
        <div>
            {!isSystemNormal && (
                <div className="border-b border-border px-7 py-4">
                    <Alert className="border-amber-200 bg-amber-50 text-amber-800">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-800">
                            Sistema no disponible
                        </AlertTitle>
                        <AlertDescription className="text-amber-700">
                            {systemStatus === 2
                                ? 'El sistema se encuentra en mantenimiento. Las solicitudes están temporalmente deshabilitadas.'
                                : 'El sistema se encuentra colapsado. Por favor intente más tarde.'}
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            {specialities.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 px-7 py-12 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground/40" />
                    <p className="text-sm font-medium text-muted-foreground">
                        No se encontraron especialidades registradas.
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                        Contacte a Control de Estudios si cree que esto es un error.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-border bg-primary/3 hover:bg-primary/3">
                                <TableHead className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                    Especialidad
                                </TableHead>
                                <TableHead className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                    Título
                                </TableHead>
                                <TableHead className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                    Tipo
                                </TableHead>
                                <TableHead className="px-7 py-3 text-right text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                    Acciones
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-border">
                            {specialities.map((speciality) => (
                                <TableRow key={speciality.id} className="db-row transition-colors">
                                    <TableCell className="max-w-md px-7 py-4 font-medium text-card-foreground">
                                        {speciality.name}
                                    </TableCell>
                                    <TableCell className="px-7 py-4 text-muted-foreground">
                                        {speciality.title}
                                    </TableCell>
                                    <TableCell className="px-7 py-4">
                                        {specialityTypeBadge(speciality.type)}
                                    </TableCell>
                                    <TableCell className="px-7 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={create(speciality.id).url}
                                                className={`inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-3.5 text-xs font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground ${!isSystemNormal ? 'pointer-events-none opacity-40' : ''}`}
                                            >
                                                Sin Soporte
                                            </Link>
                                            <button
                                                disabled={!isSystemNormal}
                                                className="db-btn-primary inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                Con Soporte
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
