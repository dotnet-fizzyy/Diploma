import { UserRole } from '../constants/userConstants';
import { IUser } from '../types/userTypes';

abstract class BaseRouteGuard {
    protected readonly _user: IUser;

    protected constructor(user: IUser) {
        this._user = user;
    }

    protected baseValidation(): boolean {
        return !!(this._user && this._user.userId && this._user.userRole);
    }

    protected abstract validate(): boolean;
}

export class UserRouteGuard extends BaseRouteGuard {
    public constructor(user: IUser) {
        super(user);
    }

    public validate(): boolean {
        return super.baseValidation();
    }
}

export class CustomerRouteGuard extends BaseRouteGuard {
    public constructor(user: IUser) {
        super(user);
    }

    public validate(): boolean {
        const isValid: boolean = super.baseValidation();

        return isValid && this._user.userRole === UserRole.ProductOwner;
    }
}

export function getQueryParameter(search: string, key: string): string {
    const params = new URLSearchParams(search);

    return params.get(key);
}
