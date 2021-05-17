import { AccessTokenLocalStorageField, GuidRegexExpression, RefreshTokenLocalStorageField } from '../constants';
import { UserPosition, UserRole } from '../constants/userConstants';

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

export const validateGuid = (value: string): boolean => GuidRegexExpression.test(value);

export const isUserCustomer = (userRole: UserRole, userPosition: UserPosition): boolean =>
    userRole === UserRole.Manager && userPosition === UserPosition.Customer;
