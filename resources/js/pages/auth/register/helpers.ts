export function getCsrfToken(): string {
    return decodeURIComponent(
        document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1] ?? '',
    );
}

export async function postJson(url: string, body: unknown): Promise<{ ok: boolean; data: unknown }> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCsrfToken(),
            Accept: 'application/json',
        },
        body: JSON.stringify(body),
    });

    const text = await res.text();
    const data: unknown = text ? JSON.parse(text) : null;

    return { ok: res.ok, data };
}
