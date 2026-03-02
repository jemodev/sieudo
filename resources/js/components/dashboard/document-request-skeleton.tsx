import { Skeleton } from '@/components/ui/skeleton';

export default function DocumentRequestSkeleton() {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-border bg-primary/3">
                        <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                            Especialidad
                        </th>
                        <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                            Título
                        </th>
                        <th className="px-7 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                            Tipo
                        </th>
                        <th className="px-7 py-3 text-right text-[0.6875rem] font-semibold uppercase tracking-[0.07em] text-primary/70">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {[1, 2, 3].map((i) => (
                        <tr key={i} className="transition-colors">
                            <td className="px-7 py-4">
                                <Skeleton className="h-4 w-64" />
                            </td>
                            <td className="px-7 py-4">
                                <Skeleton className="h-4 w-48" />
                            </td>
                            <td className="px-7 py-4">
                                <Skeleton className="h-5 w-20 rounded-md" />
                            </td>
                            <td className="px-7 py-4">
                                <div className="flex items-center justify-end gap-2">
                                    <Skeleton className="h-8 w-24 rounded-lg" />
                                    <Skeleton className="h-8 w-24 rounded-lg" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
