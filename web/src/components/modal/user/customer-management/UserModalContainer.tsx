import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../../constants';
import { CustomerInitialState, UserInitialState } from '../../../../constants/userConstants';
import { createUserRequest } from '../../../../redux/actions/userActions';
import { getModalOption } from '../../../../redux/selectors/modalSelectors';
import { getSelectedTeamId } from '../../../../redux/selectors/teamSelectors';
import { getWorkSpaceId } from '../../../../redux/selectors/workSpaceSelectors';
import { ModalOptions } from '../../../../types/modalTypes';
import { IUser } from '../../../../types/userTypes';
import { EmailInputFormFieldValidator, InputFormFieldValidator } from '../../../../utils/formHelper';
import { createUserPositionDropdownItems, createUserRoleDropdownItems } from '../../../../utils/userHelper';
import UserModal, { IUserCreationProps } from './UserModal';

const UserModalContainer = () => {
    const dispatch = useDispatch();
    const userRoles = createUserRoleDropdownItems();
    const userPositions = createUserPositionDropdownItems();
    const modalOption = useSelector(getModalOption);
    const workSpaceId: string = useSelector(getWorkSpaceId);
    const teamId: string = useSelector(getSelectedTeamId);
    const initialState = modalOption === ModalOptions.CUSTOMER_CREATION ? CustomerInitialState : UserInitialState;
    const mainLabel: string = 'Create a new team member';

    const onClickSubmit = (values: IUser) => {
        values.workSpaceId = workSpaceId;
        values.teamId = teamId;

        dispatch(createUserRequest(values));
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
