import { z } from 'zod';

export const step1Schema = z.object({
    dni: z.string().regex(/^\d{6,12}$/, 'Debe tener entre 6 y 12 dígitos'),
});

export const step2Schema = z
    .object({
        gender: z.enum(['M', 'F'], { message: 'Seleccione un género' }),
        email: z.email('Correo electrónico inválido'),
        password: z.string().min(8, 'Mínimo 8 caracteres').max(20, 'Máximo 20 caracteres'),
        password_confirmation: z.string(),
        phone: z
            .string()
            .regex(
                /^(0414|0424|0416|0426|0412|0422)-?\d{7}$/,
                'Formato inválido',
            ),
        q1_id: z.number({ message: 'Seleccione una pregunta' }).int().positive(),
        q1_answer: z.string().min(1, 'Ingrese su respuesta'),
        q2_id: z.number({ message: 'Seleccione una pregunta' }).int().positive(),
        q2_answer: z.string().min(1, 'Ingrese su respuesta'),
        q3_id: z.number({ message: 'Seleccione una pregunta' }).int().positive(),
        q3_answer: z.string().min(1, 'Ingrese su respuesta'),
    })
    .refine((d) => d.password === d.password_confirmation, {
        message: 'Las contraseñas no coinciden',
        path: ['password_confirmation'],
    });

export type Step1Values = z.infer<typeof step1Schema>;
export type Step2Values = z.infer<typeof step2Schema>;
