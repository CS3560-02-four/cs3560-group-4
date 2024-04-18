import 'server-only';
import { cookies } from 'next/headers';

export function createSession(accountId: number) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); //1 hour

    cookies().set({
        name: 'account',
        value: accountId.toString(),
        httpOnly: true,
        expires: expiresAt,
        path: '/'
    });
}