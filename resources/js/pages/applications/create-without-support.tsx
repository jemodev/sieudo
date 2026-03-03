import { Head, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle2,
    FileCheckIcon,
    FileText,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { store } from '@/actions/App/Http/Controllers/ApplicationController';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

interface DocumentType {
    id: number;
    code: string;
    description: string;
    price: number;
}

interface Speciality {
    id: number;
    name: string;
    title: string;
    type: number;
    new_code: string;
}

interface Graduate {
    name: string;
    dni: string;
}

interface Props {
    speciality: Speciality;
    documentTypes: DocumentType[];
    graduate: Graduate;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Solicitud sin soporte', href: '#' },
];

const formatPrice = (price: number) =>
    price.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Bs';

export default function CreateWithoutSupport({ speciality, documentTypes, graduate }: Props) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const form = useForm<{ document_codes: string[] }>({
        document_codes: [],
    });

    const selectedTypes = documentTypes.filter((dt) =>
        form.data.document_codes.includes(dt.code),
    );

    const total = selectedTypes.reduce((sum, dt) => sum + dt.price, 0);
    const selectedCount = form.data.document_codes.length;
    const documentCount = documentTypes.length;

    const toggleCode = (code: string, checked: boolean) => {
        if (checked) {
            form.setData('document_codes', [...form.data.document_codes, code]);
        } else {
            form.setData(
                'document_codes',
                form.data.document_codes.filter((c) => c !== code),
            );
        }
    };

    const handleConfirm = () => {
        form.post(store(speciality.id).url, {
            onSuccess: () => toast.success('Solicitud enviada correctamente.'),
            onFinish: () => setConfirmOpen(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Solicitud sin soporte" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-5">
                <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    {/* Header */}
                    <header className="border-b border-border px-7 py-5">
                        <div className="flex items-start gap-4">
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                                <FileText className="h-4.5 w-4.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="cws-heading text-base font-semibold text-card-foreground">
                                        {speciality.name}
                                    </h2>
                                    <Badge
                                        variant={
                                            speciality.type === 2
                                                ? 'secondary'
                                                : 'outline'
                                        }
                                        className="shrink-0"
                                    >
                                        {speciality.type === 2
                                            ? 'Postgrado'
                                            : 'Pregrado'}
                                    </Badge>
                                    <span className="cws-mono shrink-0 rounded-md bg-muted px-2 py-0.5 text-[0.6875rem] text-muted-foreground">
                                        {speciality.new_code}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                    {speciality.title}
                                </p>
                                <p className="mt-0.5 text-xs text-muted-foreground/60">
                                    Marque los documentos que desea solicitar y
                                    confirme la operación.
                                </p>
                            </div>
                        </div>
                    </header>

                    {/* Body */}
                    {documentTypes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-3 px-7 py-16 text-center">
                            <div className="relative">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                                    <FileText className="h-6 w-6 text-muted-foreground/40" />
                                </div>
                                <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-border">
                                    <AlertCircle className="h-3 w-3 text-muted-foreground/60" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-card-foreground">
                                    Sin documentos disponibles
                                </p>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    No hay tipos de documento configurados para
                                    esta especialidad.
                                    <br />
                                    Contacte a Control de Estudios si cree que
                                    esto es un error.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b border-border bg-primary/3 hover:bg-primary/3">
                                            <TableHead className="w-12 px-7 py-3" />
                                            <TableHead className="px-4 py-3 text-[0.6875rem] font-semibold tracking-[0.07em] text-primary/70 uppercase">
                                                Cód.
                                            </TableHead>
                                            <TableHead className="px-7 py-3 text-[0.6875rem] font-semibold tracking-[0.07em] text-primary/70 uppercase">
                                                Descripción
                                            </TableHead>
                                            <TableHead className="px-7 py-3 text-right text-[0.6875rem] font-semibold tracking-[0.07em] text-primary/70 uppercase">
                                                Precio
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="divide-y divide-border">
                                        {documentTypes.map((dt) => {
                                            const isChecked =
                                                form.data.document_codes.includes(
                                                    dt.code,
                                                );
                                            return (
                                                <TableRow
                                                    key={dt.id}
                                                    data-selected={isChecked}
                                                    className="cws-row"
                                                    onClick={() =>
                                                        toggleCode(
                                                            dt.code,
                                                            !isChecked,
                                                        )
                                                    }
                                                >
                                                    <TableCell className="px-7 py-4">
                                                        <Checkbox
                                                            checked={isChecked}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                toggleCode(
                                                                    dt.code,
                                                                    checked ===
                                                                        true,
                                                                )
                                                            }
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell className="cws-mono px-4 py-4 text-xs text-muted-foreground">
                                                        {dt.code}
                                                    </TableCell>
                                                    <TableCell
                                                        className={`px-7 py-4 transition-colors ${isChecked ? 'font-semibold text-card-foreground' : 'font-medium text-card-foreground/80'}`}
                                                    >
                                                        {dt.description}
                                                    </TableCell>
                                                    <TableCell
                                                        className={`cws-mono px-7 py-4 text-right text-sm transition-colors ${isChecked ? 'font-semibold text-card-foreground' : 'text-muted-foreground'}`}
                                                    >
                                                        {formatPrice(dt.price)}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between gap-4 border-t border-border bg-muted/20 px-7 py-4">
                                {/* Left: selection status */}
                                <div className="flex items-center gap-2.5 text-sm">
                                    {selectedCount > 0 ? (
                                        <>
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.625rem] font-bold text-primary-foreground">
                                                {selectedCount}
                                            </span>
                                            <span className="text-muted-foreground">
                                                de{' '}
                                                <span className="font-medium text-card-foreground">
                                                    {documentCount}
                                                </span>{' '}
                                                documento
                                                {documentCount !== 1 ? 's' : ''}{' '}
                                                seleccionado
                                                {selectedCount !== 1 ? 's' : ''}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-muted-foreground">
                                            <FileCheckIcon className="h-3.5 w-3.5" />
                                            Seleccione al menos un documento
                                            para continuar
                                        </span>
                                    )}
                                </div>

                                {/* Right: total + action */}
                                <div className="flex items-center gap-5">
                                    {selectedCount > 0 && (
                                        <div className="text-right">
                                            <span className="block text-[0.625rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                                                Total
                                            </span>
                                            <span className="cws-mono text-base font-semibold text-card-foreground">
                                                {formatPrice(total)}
                                            </span>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => setConfirmOpen(true)}
                                        disabled={selectedCount === 0}
                                        className="cws-btn-confirm inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Confirmar solicitud
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </div>

            {/* Confirmation dialog */}
            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="pb-1">
                        <DialogTitle className="cws-heading text-base">
                            Confirmar solicitud
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3 text-sm">
                        {/* Graduate & speciality */}
                        <div className="divide-y divide-border rounded-lg border border-border">
                            <div className="flex items-center justify-between px-3.5 py-2.5">
                                <span className="text-xs text-muted-foreground">
                                    Egresado
                                </span>
                                <span className="font-medium text-card-foreground">
                                    {graduate.name}
                                </span>
                            </div>
                            <div className="flex items-center justify-between px-3.5 py-2.5">
                                <span className="text-xs text-muted-foreground">
                                    C.I.
                                </span>
                                <span className="cws-mono text-card-foreground">
                                    {graduate.dni}
                                </span>
                            </div>
                            <div className="flex items-start justify-between gap-3 px-3.5 py-2.5">
                                <span className="text-xs text-muted-foreground">
                                    Especialidad
                                </span>
                                <span className="text-right font-medium text-card-foreground">
                                    {speciality.name}
                                </span>
                            </div>
                        </div>

                        {/* Documents */}
                        <div>
                            <p className="mb-1.5 px-0.5 text-[0.6875rem] font-semibold tracking-wider text-muted-foreground uppercase">
                                Documentos solicitados
                            </p>
                            <div className="divide-y divide-border rounded-lg border border-border">
                                {selectedTypes.map((dt) => (
                                    <div
                                        key={dt.id}
                                        className="flex items-center justify-between gap-3 px-3.5 py-2.5"
                                    >
                                        <div className="flex min-w-0 items-center gap-2">
                                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary/50" />
                                            <span className="truncate text-card-foreground">
                                                {dt.description}
                                            </span>
                                        </div>
                                        <span className="cws-mono shrink-0 text-xs text-muted-foreground">
                                            {formatPrice(dt.price)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-3.5 py-3">
                            <span className="font-semibold text-card-foreground">
                                Total a pagar
                            </span>
                            <span className="cws-mono text-base font-bold text-card-foreground">
                                {formatPrice(total)}
                            </span>
                        </div>

                        {/* Note */}
                        <p className="flex items-start gap-1.5 rounded-md bg-muted/60 px-3 py-2.5 text-xs text-muted-foreground">
                            <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" />
                            Deberá realizar el pago en Caja una vez que la
                            solicitud sea procesada por Control de Estudios.
                        </p>
                    </div>

                    <DialogFooter className="pt-1">
                        <button
                            onClick={() => setConfirmOpen(false)}
                            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={form.processing}
                            className="cws-btn-confirm inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {form.processing ? 'Enviando...' : 'Confirmar'}
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
