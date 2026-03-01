import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    children,
    title,
    description,
    maxWidth,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
    maxWidth?: string;
}) {
    return (
        <AuthLayoutTemplate title={title} description={description} maxWidth={maxWidth} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
