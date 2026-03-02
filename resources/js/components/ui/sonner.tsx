import { useAppearance } from '@/hooks/use-appearance';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
    const { appearance } = useAppearance();

    return (
        <Sonner
            theme={appearance as ToasterProps['theme']}
            className="toaster group"
            {...props}
        />
    );
}

export { Toaster };
