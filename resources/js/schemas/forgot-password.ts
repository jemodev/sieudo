import { z } from 'zod';

export const step1Schema = z.object({
    dni: z.string().regex(/^\d{6,12}$/, 'Debe tener entre 6 y 12 dígitos'),
});

export const step2Schema = z.object({
    a1: z.string().min(1, 'Ingrese su respuesta'),
    a2: z.string().min(1, 'Ingrese su respuesta'),
    a3: z.string().min(1, 'Ingrese su respuesta'),
});

export type Step1Values = z.infer<typeof step1Schema>;
export type Step2Values = z.infer<typeof step2Schema>;
