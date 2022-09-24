import { ProjectPosition, UserRole } from '../constants/user';
import { IUser } from '../types/user';

abstract class BaseRouteGuard {
    protected readonly _user: IUser;

    protected constructor(user: IUser) {
        this._user = user;
    }

    protected baseValidation(): boolean {
        return !!(this._user?.userId && this._user?.userRole);
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

        return (
            isValid && this._user.userRole === UserRole.Manager && this._user.userPosition === ProjectPosition.Customer
        );
    }
}

export const getQueryParameter = (search: string, key: string): string => {
    const params = new URLSearchParams(search);

    return params.get(key);
};
