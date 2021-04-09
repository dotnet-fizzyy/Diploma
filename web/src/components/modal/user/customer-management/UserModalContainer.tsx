import React from 'react';
import { useDispatch } from 'react-redux';
import { BaseRegexExpression } from '../../../../constants';
import { userInitialState } from '../../../../constants/userConstants';
import * as userActions from '../../../../redux/actions/userActions';
import { IUser } from '../../../../types/userTypes';
import { EmailInputFormFieldValidator, InputFormFieldValidator } from '../../../../utils/formHelper';
import { createUserPositionDropdownItems, createUserRoleDropdownItems } from '../../../../utils/userHelper';
import UserModal, { IUserCreationProps } from './UserModal';

const UserModalContainer = () => {
    const dispatch = useDispatch();
    const userRoles = createUserRoleDropdownItems();
    const userPositions = createUserPositionDropdownItems();
    const initialState = userInitialState;
    const mainLabel: string = 'Create a new team member';

    const onClickSubmit = (values: IUser) => {
        dispatch(userActions.createUserRequest(values));
    };

    const validateField = (value: string): string =>
        new InputFormFieldValidator(value, null, null, true, BaseRegexExpression).validate();

    const validateEmail = (value: string): string => new EmailInputFormFieldValidator(value).validate();

    const validatePassword = (value: string): string => new InputFormFieldValidator(value, 3, 16, true).validate();

    const userCreationProps: IUserCreationProps = {
        mainLabel,
        initialState,
        userRoles,
        userPositions,
        validateField,
        validateEmail,
        validatePassword,
        onClickSubmit,
    };

    return <UserModal {...userCreationProps} />;
};

export default UserModalContainer;
