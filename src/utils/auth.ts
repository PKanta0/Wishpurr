import { STORAGE_KEYS } from "../config/api";

export type StoredUser = {
    id: number;
    name: string;
    email: string;
    role: "user" | "admin";
};

export function getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.token);
}

export function getStoredUser(): StoredUser | null {
    const raw = localStorage.getItem(STORAGE_KEYS.user);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as StoredUser;
    } catch {
        return null;
    }
}

export function saveAuth(token: string, user: StoredUser) {
    localStorage.setItem(STORAGE_KEYS.token, token);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

export function clearAuth() {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
}
