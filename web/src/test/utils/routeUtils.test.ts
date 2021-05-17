import { UserPosition, UserRole } from '../../constants/userConstants';
import { mockedUser } from '../../mock/mockedUser';
import { IUser } from '../../types/userTypes';
import { CustomerRouteGuard, UserRouteGuard } from '../../utils/routeUtils';

describe('Route utils', () => {
    it('Should validate authorized user', () => {
        //Arrange
        const userGuard: UserRouteGuard = new UserRouteGuard(mockedUser);

        //Act
        const result: boolean = userGuard.validate();

        //Assert
        expect(result).toBeTruthy();
    });

    it('Should validate unauthorized user', () => {
        //Arrange
        const userGuard: UserRouteGuard = new UserRouteGuard(null);

        //Act
        const result: boolean = userGuard.validate();

        //Assert
        expect(result).toBeFalsy();
    });

    it('Should validate authorized user with manager role', () => {
        //Arrange
        const user: IUser = {
            ...mockedUser,
            userRole: UserRole.Manager,
            userPosition: UserPosition.Customer,
        };
        const customerGuard: CustomerRouteGuard = new CustomerRouteGuard(user);

        //Act
        const result: boolean = customerGuard.validate();

        //Assert
        expect(result).toBeTruthy();
    });

    it('Should validate authorized user without manager role', () => {
        //Arrange
        const customerGuard: CustomerRouteGuard = new CustomerRouteGuard(mockedUser);

        //Act
        const result: boolean = customerGuard.validate();

        //Assert
        expect(result).toBeFalsy();
    });
});
