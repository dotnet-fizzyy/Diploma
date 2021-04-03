import { AccessTokenLocalStorageField, RefreshTokenLocalStorageField } from '../constants';

export function setCredentialsToLocalStorage(accessToken: string, refreshToken: string): void {
    localStorage.setItem(AccessTokenLocalStorageField, accessToken);
    localStorage.setItem(RefreshTokenLocalStorageField, refreshToken);
}

export function clearCredentialsFromLocalStorage(): void {
    localStorage.removeItem(AccessTokenLocalStorageField);
    localStorage.removeItem(RefreshTokenLocalStorageField);
}

export function getFirstNameLetter(userName: string): string {
    return userName ? userName.slice(0, 1) : '';
}
