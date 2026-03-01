import { Check } from 'lucide-react';
import { Fragment } from 'react';

import { cn } from '@/lib/utils';

import { type StepNumber } from './types';

const WIZARD_STEPS: { number: StepNumber; label: string }[] = [
    { number: 1, label: 'Verificación' },
    { number: 2, label: 'Datos' },
    { number: 3, label: 'Confirmación' },
    { number: 4, label: 'Completado' },
];

export function WizardNav({
    currentStep,
    maxReachedStep,
    onNavigate,
}: {
    currentStep: StepNumber;
    maxReachedStep: StepNumber;
    onNavigate: (step: StepNumber) => void;
}) {
    return (
        <nav className="mb-8 flex items-start">
            {WIZARD_STEPS.map((wizardStep, index) => {
                const isCompleted = wizardStep.number < currentStep;
                const isActive = wizardStep.number === currentStep;
                const isReachable =
                    wizardStep.number <= maxReachedStep &&
                    wizardStep.number !== currentStep &&
                    currentStep !== 4 &&
                    wizardStep.number !== 4;
                const showConnector = index < WIZARD_STEPS.length - 1;

                return (
                    <Fragment key={wizardStep.number}>
                        <button
                            type="button"
                            onClick={() => isReachable && onNavigate(wizardStep.number)}
                            disabled={!isReachable}
                            className={cn(
                                'flex flex-col items-center gap-2',
                                isReachable ? 'cursor-pointer' : 'cursor-default',
                            )}
                        >
                            <div
                                className={cn(
                                    'flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all',
                                    isCompleted &&
                                        'border-primary bg-primary text-primary-foreground',
                                    isActive &&
                                        'border-primary bg-primary text-primary-foreground shadow-[0_0_0_4px] shadow-primary/20',
                                    !isCompleted &&
                                        !isActive &&
                                        isReachable &&
                                        'border-primary/60 bg-background text-primary',
                                    !isCompleted &&
                                        !isActive &&
                                        !isReachable &&
                                        'border-border bg-muted text-muted-foreground',
                                )}
                            >
                                {isCompleted ? <Check className="size-4" /> : wizardStep.number}
                            </div>
                            <span
                                className={cn(
                                    'text-xs font-medium',
                                    isActive && 'text-foreground',
                                    isCompleted && 'text-primary',
                                    !isActive && !isCompleted && 'text-muted-foreground',
                                )}
                            >
                                {wizardStep.label}
                            </span>
                        </button>

                        {showConnector && (
                            <div
                                className={cn(
                                    'mt-4 h-0.5 flex-1 rounded-full transition-colors',
                                    isCompleted ? 'bg-primary' : 'bg-border',
                                )}
                            />
                        )}
                    </Fragment>
                );
            })}
        </nav>
    );
}
