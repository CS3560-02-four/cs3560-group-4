import 'server-only';
import { cookies } from 'next/headers';

export function login(accountId: number) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); //1 hour

    cookies().set({
        name: 'account',
        value: accountId.toString(),
        httpOnly: true,
        expires: expiresAt,
        path: '/'
    });
}

export function loginAdmin(accountId: number) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); //1 hour

    cookies().set({
        name: 'admin',
        value: accountId.toString(),
        httpOnly: true,
        expires: expiresAt,
        path: '/'
    });
}

export function logout() {
    cookies().delete('account');
    cookies().delete('admin');
}

//Gets currently logged in user's id
export function getAccountId() {
    if (cookies().has('account'))
        return cookies().get('account')?.value;
}

export function isAdminLoggedIn() {
    return cookies().has('account');
}
