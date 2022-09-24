import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../../constants';
import { ModalOptions } from '../../../../constants/modal';
import {
    CustomerInitialState,
    ProjectPosition,
    UserInitialState,
    UserPositionRoleMap,
} from '../../../../constants/user';
import { createUserRequest } from '../../../../redux/actions/user';
import { getModalOption, getModalRequestPerforming } from '../../../../redux/selectors/modal';
import { getSelectedTeamId } from '../../../../redux/selectors/team';
import { getWorkSpaceId } from '../../../../redux/selectors/user';
import { IUser } from '../../../../types/user';
import { validateEmailInputFormField, validateInputFormField } from '../../../../utils/forms';
import { createUserPositionDropdownItems } from '../../../../utils/user';
import UserModal, { IUserCreationProps } from './UserModal';

const UserModalContainer = () => {
    const dispatch = useDispatch();
    const userPositions = createUserPositionDropdownItems().filter((x) => x.value !== ProjectPosition.Customer);
    const modalOption = useSelector(getModalOption);
    const workSpaceId: string = useSelector(getWorkSpaceId);
    const teamId: string = useSelector(getSelectedTeamId);
    const isPerformingRequest: boolean = useSelector(getModalRequestPerforming);

    const initialState = modalOption === ModalOptions.CUSTOMER_CREATION ? CustomerInitialState : UserInitialState;
    const mainLabel: string = 'Create a new team member';

    const onClickSubmit = (values: IUser) => {
        values.workSpaceId = workSpaceId;
        values.teamId = teamId;
        values.userRole = UserPositionRoleMap[values.userPosition];

        dispatch(createUserRequest(values));
    };

    const validateField = (value: string): string => {
        const isRequired = true;
        const minLength = null;
        const maxLength = null;

        return validateInputFormField(value, isRequired, minLength, maxLength, BaseRegexExpression);
    };

    const validateEmail = (value: string): string => validateEmailInputFormField(value);

    const validatePassword = (value: string): string => {
        const isRequired = true;
        const minLength = 3;
        const maxLength = 16;

        return validateInputFormField(value, isRequired, minLength, maxLength);
    };

    const userCreationProps: IUserCreationProps = {
        isPerformingRequest,
        mainLabel,
        initialState,
        userPositions,
        validateField,
        validateEmail,
        validatePassword,
        onClickSubmit,
    };

    return <UserModal {...userCreationProps} />;
};

export default UserModalContainer;
