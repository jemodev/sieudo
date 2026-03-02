import { Head, useForm } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import { useState } from 'react';
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
            onFinish: () => setConfirmOpen(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Solicitud sin soporte" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-5">
                <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    <header className="flex items-start gap-3.5 border-b border-border px-7 py-5">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-[0.9375rem] font-semibold text-card-foreground">
                                    {speciality.name}
                                </h3>
                                <Badge variant={speciality.type === 2 ? 'secondary' : 'outline'}>
                                    {speciality.type === 2 ? 'Postgrado' : 'Pregrado'}
                                </Badge>
                            </div>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                                {speciality.title} — Seleccione los documentos que necesita solicitar.
                            </p>
                        </div>
                    </header>

                    {documentTypes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-2 px-7 py-12 text-center">
                            <FileText className="h-8 w-8 text-muted-foreground/40" />
                            <p className="text-sm font-medium text-muted-foreground">
                                No hay documentos disponibles para esta especialidad.
                            </p>
                            <p className="text-xs text-muted-foreground/70">
                                Contacte a Control de Estudios si cree que esto es un error.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b border-border bg-primary/3 hover:bg-primary/3">
                                            <TableHead className="w-12 px-7 py-3" />
                                            <TableHead className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                                Cód.
                                            </TableHead>
                                            <TableHead className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                                Descripción
                                            </TableHead>
                                            <TableHead className="px-7 py-3 text-right text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                                Precio
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="divide-y divide-border">
                                        {documentTypes.map((dt) => {
                                            const isChecked = form.data.document_codes.includes(dt.code);
                                            return (
                                                <TableRow
                                                    key={dt.id}
                                                    className="cursor-pointer transition-colors hover:bg-muted/40"
                                                    onClick={() => toggleCode(dt.code, !isChecked)}
                                                >
                                                    <TableCell className="px-7 py-4">
                                                        <Checkbox
                                                            checked={isChecked}
                                                            onCheckedChange={(checked) =>
                                                                toggleCode(dt.code, checked === true)
                                                            }
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="px-7 py-4 font-mono text-xs text-muted-foreground">
                                                        {dt.code}
                                                    </TableCell>
                                                    <TableCell className="px-7 py-4 font-medium text-card-foreground">
                                                        {dt.description}
                                                    </TableCell>
                                                    <TableCell className="px-7 py-4 text-right font-mono text-sm text-card-foreground">
                                                        {formatPrice(dt.price)}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex items-center justify-between border-t border-border px-7 py-4">
                                <div className="text-sm text-muted-foreground">
                                    {form.data.document_codes.length === 0
                                        ? 'Seleccione al menos un documento'
                                        : `${form.data.document_codes.length} documento(s) seleccionado(s)`}
                                </div>
                                <div className="flex items-center gap-4">
                                    {form.data.document_codes.length > 0 && (
                                        <span className="font-mono text-sm font-semibold text-card-foreground">
                                            Total: {formatPrice(total)}
                                        </span>
                                    )}
                                    <button
                                        onClick={() => setConfirmOpen(true)}
                                        disabled={form.data.document_codes.length === 0}
                                        className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Confirmar solicitud
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </div>

            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirmar solicitud</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 text-sm">
                        <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-1.5">
                            <div className="flex justify-between gap-2">
                                <span className="text-muted-foreground">Egresado</span>
                                <span className="font-medium text-card-foreground">{graduate.name}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="text-muted-foreground">C.I.</span>
                                <span className="font-mono text-card-foreground">{graduate.dni}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="text-muted-foreground">Especialidad</span>
                                <span className="text-right font-medium text-card-foreground">{speciality.name}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Documentos seleccionados
                            </p>
                            <div className="divide-y divide-border rounded-lg border border-border">
                                {selectedTypes.map((dt) => (
                                    <div key={dt.id} className="flex items-center justify-between px-3 py-2">
                                        <span className="text-card-foreground">{dt.description}</span>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            {formatPrice(dt.price)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-primary/5 px-4 py-3">
                            <span className="font-semibold text-card-foreground">Total</span>
                            <span className="font-mono font-semibold text-card-foreground">
                                {formatPrice(total)}
                            </span>
                        </div>
                    </div>

                    <DialogFooter>
                        <button
                            onClick={() => setConfirmOpen(false)}
                            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={form.processing}
                            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {form.processing ? 'Enviando...' : 'Confirmar'}
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
