export type WizardStep =
    | 'step1'
    | 'not_found'
    | 'already_registered'
    | 'step2'
    | 'step3'
    | 'step4';

export type StepNumber = 1 | 2 | 3 | 4;

export type OpsuData = {
    dni: string;
    nombres: string;
    apellidos: string;
    sexo: string;
    correo: string;
    telefono: string;
};

export type JsonErrorResponse = {
    errors?: Record<string, string[]>;
    message?: string;
};

export type Question = {
    id: number;
    question: string;
};
