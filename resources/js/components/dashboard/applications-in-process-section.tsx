import { ChevronRight, Clock } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface ApplicationDocument {
    id: number;
    code: string;
    description: string;
}

export interface ApplicationInProcess {
    id: number;
    code: string;
    specialityTitle: string;
    documentSupport: boolean;
    amount: string;
    status: string;
    documents: ApplicationDocument[];
}

interface StatusBadge {
    label: string;
    className: string;
    dotClassName: string;
    pulse: boolean;
}

function getStatusBadge(status: string): StatusBadge {
    if (status === '1') {
        return {
            label: 'En revisión',
            className: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300',
            dotClassName: 'bg-blue-400',
            pulse: false,
        };
    }
    if (status === '2') {
        return {
            label: 'Pago rechazado',
            className: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300',
            dotClassName: 'bg-red-400',
            pulse: false,
        };
    }
    if (status === '0') {
        return {
            label: 'Pendiente de pago',
            className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300',
            dotClassName: 'bg-amber-400',
            pulse: false,
        };
    }
    return {
        label: 'En proceso',
        className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300',
        dotClassName: 'bg-amber-400',
        pulse: true,
    };
}

interface Props {
    applicationsInProcess: ApplicationInProcess[];
}

export default function ApplicationsInProcessSection({ applicationsInProcess }: Props) {
    const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

    const toggleExpanded = (id: number) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    if (applicationsInProcess.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 px-7 py-12 text-center">
                <Clock className="h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground">
                    No hay solicitudes en proceso.
                </p>
                <p className="text-xs text-muted-foreground/70">
                    Sus solicitudes activas aparecerán aquí.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="border-b border-border bg-primary/3 hover:bg-primary/3">
                        <TableHead className="w-10 px-4 py-3" />
                        <TableHead className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                            N° Solicitud
                        </TableHead>
                        <TableHead className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                            Especialidad
                        </TableHead>
                        <TableHead className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                            Soporte
                        </TableHead>
                        <TableHead className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                            Monto
                        </TableHead>
                        <TableHead className="px-7 py-3 text-right text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                            Estado
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-border">
                    {applicationsInProcess.map((app) => {
                        const isExpanded = expandedIds.has(app.id);
                        const badge = getStatusBadge(app.status);
                        return (
                            <Fragment key={app.id}>
                                <TableRow
                                    onClick={() => toggleExpanded(app.id)}
                                    data-expanded={isExpanded ? 'true' : 'false'}
                                    className="aip-row"
                                >
                                    <TableCell className="px-4 py-4">
                                        <div className="flex h-5 w-5 items-center justify-center text-muted-foreground">
                                            <ChevronRight
                                                className={cn(
                                                    'h-3.5 w-3.5 transition-[rotate] duration-200',
                                                    isExpanded ? 'rotate-90' : 'rotate-0',
                                                )}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="db-mono px-7 py-4 text-xs text-muted-foreground">
                                        {app.code}
                                    </TableCell>
                                    <TableCell
                                        className="max-w-xs truncate px-7 py-4 font-medium text-card-foreground"
                                        title={app.specialityTitle}
                                    >
                                        {app.specialityTitle}
                                    </TableCell>
                                    <TableCell className="px-7 py-4">
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                'font-medium',
                                                app.documentSupport
                                                    ? 'border-primary/20 bg-primary/8 text-primary dark:bg-primary/15'
                                                    : 'text-muted-foreground',
                                            )}
                                        >
                                            {app.documentSupport ? 'Con soporte' : 'Sin soporte'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="db-mono px-7 py-4 font-medium text-card-foreground">
                                        {app.amount}
                                    </TableCell>
                                    <TableCell className="px-7 py-4 text-right">
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                'rounded-full gap-1.5 px-2.5 py-1 text-[0.6875rem]',
                                                badge.className,
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    'h-1.5 w-1.5 rounded-full',
                                                    badge.dotClassName,
                                                    badge.pulse && 'animate-pulse',
                                                )}
                                            />
                                            {badge.label}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                                {isExpanded && (
                                    <tr className="aip-docs-row">
                                        <td colSpan={6} className="px-7 py-4 pl-16">
                                            {app.documents.length === 0 ? (
                                                <p className="text-xs italic text-muted-foreground">
                                                    Sin documentos registrados.
                                                </p>
                                            ) : (
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="border-none hover:bg-transparent">
                                                            <TableHead className="h-auto pb-2 pr-12 text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
                                                                N° Documento
                                                            </TableHead>
                                                            <TableHead className="h-auto pb-2 text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">
                                                                Descripción
                                                            </TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody className="divide-y divide-border/40">
                                                        {app.documents.map((doc) => (
                                                            <TableRow key={doc.id} className="border-none hover:bg-transparent">
                                                                <TableCell className="db-mono py-2 pr-12 text-xs text-muted-foreground">
                                                                    {doc.code}
                                                                </TableCell>
                                                                <TableCell className="py-2 text-xs text-card-foreground">
                                                                    {doc.description}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
