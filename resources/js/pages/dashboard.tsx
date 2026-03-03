import { Deferred, Head } from '@inertiajs/react';
import { CheckCircle2, Clock, Download, FileText } from 'lucide-react';
import DocumentRequestSection from '@/components/dashboard/document-request-section';
import DocumentRequestSkeleton from '@/components/dashboard/document-request-skeleton';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

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
    pendingApplicationSpecialityIds: number[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const solicitudesProceso = [
    {
        id: '24690453150920250003220',
        especialidad: 'LICENCIADO EN INFORMATICA',
        soporte: 'Sin soporte',
        monto: '40,50 Bs',
        estado: 'En proceso',
    },
];

const documentosValidacion = [
    {
        id: '246904531509202510011722401',
        especialidad:
            'MAGISTER SCIENTIARUM EN CIENCIAS ADMINISTRATIVAS, MENCION GERENCIA GENERAL',
        descripcion: 'Autenticación de Notas',
        fecha: '15-09-2025',
        estado: 'Documento listo para retirar en Control de Estudios',
    },
];

const documentosProcesados = [
    {
        id: '246904530909202100092200201',
        especialidad: 'LICENCIADO EN INFORMATICA',
        descripcion: 'NOTAS CERTIFICADAS APROBADAS',
        fecha: '09-09-2021',
    },
    {
        id: '246904530909202100092200402',
        especialidad: 'LICENCIADO EN INFORMATICA',
        descripcion: 'NOTAS CERTIFICADAS APROBADAS Y REPROBADAS',
        fecha: '09-09-2021',
    },
    {
        id: '246904530909202100092200603',
        especialidad: 'LICENCIADO EN INFORMATICA',
        descripcion: 'PROMEDIO',
        fecha: '09-09-2021',
    },
    {
        id: '246904530909202100092200804',
        especialidad: 'LICENCIADO EN INFORMATICA',
        descripcion: 'PROGRAMA Y PENSUM',
        fecha: '09-09-2021',
    },
];

export default function Dashboard({ specialities, systemStatus, pendingApplicationSpecialityIds }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-5">

                {/* Solicitud de documentos */}
                <section className="db-section overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    <header className="flex items-start gap-3.5 border-b border-border px-7 py-5">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <FileText className="h-4 w-4" />
                        </div>
                        <div>
                            <h3 className="db-heading text-[0.9375rem] font-semibold text-card-foreground">
                                Solicitud de documentos
                            </h3>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                                Seleccione el tipo de soporte que requiere para su especialidad.
                            </p>
                        </div>
                    </header>
                    <Deferred data={['specialities', 'systemStatus', 'pendingApplicationSpecialityIds']} fallback={<DocumentRequestSkeleton />}>
                        <DocumentRequestSection
                            specialities={specialities}
                            systemStatus={systemStatus}
                            pendingApplicationSpecialityIds={pendingApplicationSpecialityIds}
                        />
                    </Deferred>
                </section>

                {/* Solicitudes en proceso */}
                <section className="db-section overflow-hidden rounded-xl border border-border bg-card shadow-sm mt-4">
                    <header className="flex items-center gap-3.5 border-b border-border px-7 py-5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                            <Clock className="h-4 w-4" />
                        </div>
                        <h3 className="db-heading text-[0.9375rem] font-semibold text-card-foreground">
                            Solicitudes en proceso
                        </h3>
                    </header>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-border bg-primary/3">
                                    <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        N° Solicitud
                                    </th>
                                    <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        Especialidad
                                    </th>
                                    <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        Soporte
                                    </th>
                                    <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        Monto
                                    </th>
                                    <th className="px-7 py-3 text-right text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {solicitudesProceso.map((sol) => (
                                    <tr
                                        key={sol.id}
                                        className="db-row transition-colors"
                                    >
                                        <td className="db-mono px-7 py-4 text-xs text-muted-foreground">
                                            {sol.id}
                                        </td>
                                        <td
                                            className="max-w-xs truncate px-7 py-4 font-medium text-card-foreground"
                                            title={sol.especialidad}
                                        >
                                            {sol.especialidad}
                                        </td>
                                        <td className="px-7 py-4 text-muted-foreground">
                                            {sol.soporte}
                                        </td>
                                        <td className="db-mono px-7 py-4 font-medium text-card-foreground">
                                            {sol.monto}
                                        </td>
                                        <td className="px-7 py-4 text-right">
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-amber-700">
                                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                                                {sol.estado}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Documentos en validación */}
                <section className="db-section overflow-hidden rounded-xl border border-border bg-card shadow-sm mt-4">
                    <header className="flex items-center gap-3.5 border-b border-border px-7 py-5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <h3 className="db-heading text-[0.9375rem] font-semibold text-card-foreground">
                            Documentos con soporte en proceso de validación
                        </h3>
                    </header>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-border bg-primary/3">
                                    <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        Especialidad
                                    </th>
                                    <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        N° Documento
                                    </th>
                                    <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        Descripción
                                    </th>
                                    <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        Fecha
                                    </th>
                                    <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        Estatus
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {documentosValidacion.map((doc) => (
                                    <tr
                                        key={doc.id}
                                        className="db-row transition-colors"
                                    >
                                        <td className="max-w-[16rem] px-7 py-4 font-medium text-card-foreground">
                                            {doc.especialidad}
                                        </td>
                                        <td className="db-mono px-7 py-4 text-xs text-muted-foreground">
                                            {doc.id}
                                        </td>
                                        <td className="px-7 py-4 text-muted-foreground">
                                            {doc.descripcion}
                                        </td>
                                        <td className="db-mono whitespace-nowrap px-7 py-4 text-xs text-muted-foreground">
                                            {doc.fecha}
                                        </td>
                                        <td className="px-7 py-4">
                                            <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-emerald-700">
                                                <CheckCircle2 className="h-3 w-3" />
                                                {doc.estado}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Documentos procesados */}
                <section className="db-section overflow-hidden rounded-xl border border-border bg-card shadow-sm mt-4">
                    <header className="flex items-center gap-3.5 border-b border-border px-7 py-5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Download className="h-4 w-4" />
                        </div>
                        <h3 className="db-heading text-[0.9375rem] font-semibold text-card-foreground">
                            Documentos procesados
                        </h3>
                    </header>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-border bg-primary/3">
                                    <th className="w-1/4 px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        Especialidad
                                    </th>
                                    <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        N° Documento
                                    </th>
                                    <th className="w-1/3 px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        Descripción
                                    </th>
                                    <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        Fecha
                                    </th>
                                    <th className="px-7 py-3 text-right text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                                        Acción
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {documentosProcesados.map((doc) => (
                                    <tr
                                        key={doc.id}
                                        className="db-row group transition-colors"
                                    >
                                        <td className="px-7 py-4 font-medium text-card-foreground">
                                            {doc.especialidad}
                                        </td>
                                        <td className="db-mono px-7 py-4 text-xs text-muted-foreground">
                                            {doc.id}
                                        </td>
                                        <td className="px-7 py-4 text-muted-foreground">
                                            {doc.descripcion}
                                        </td>
                                        <td className="db-mono whitespace-nowrap px-7 py-4 text-xs text-muted-foreground">
                                            {doc.fecha}
                                        </td>
                                        <td className="px-7 py-4 text-right">
                                            <button className="db-btn-primary inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground opacity-75 transition-all group-hover:opacity-100 hover:bg-primary/90">
                                                <Download className="h-3.5 w-3.5" />
                                                Descargar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
