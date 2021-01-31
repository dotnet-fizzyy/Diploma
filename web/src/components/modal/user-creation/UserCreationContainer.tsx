import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userInitialState } from '../../../constants/userConstants';
import { createUserPositionDropdownItems, createUserRoleDropdownItems } from '../../../utils/userHelper';
import * as userActions from '../../../redux/actions/currentUserActions';
import { IUser } from '../../../types/userTypes';
import UserCreation, { IUserCreationProps } from './UserCreation';

const UserCreationContainer = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<IUser>(userInitialState);
    const userRoles = createUserRoleDropdownItems();
    const userPositions = createUserPositionDropdownItems();

    const onChangeUserField = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { value, name } = event.target;
        setUser((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const onClickCreateUser = () => {
        dispatch(userActions.createUserRequest(user));
    };

    const userCreationProps: IUserCreationProps = {
        user,
        userRoles,
        userPositions,
        onClickCreateUser,
        onChangeUserField,
    };

    return <UserCreation {...userCreationProps} />;
};

export default UserCreationContainer;
