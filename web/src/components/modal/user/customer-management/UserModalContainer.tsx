import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../../constants';
import { ModalOptions } from '../../../../constants/modalConstants';
import {
    CustomerInitialState,
    UserInitialState,
    UserPosition,
    UserPositionRoleMap,
} from '../../../../constants/userConstants';
import { createUserRequest } from '../../../../redux/actions/user';
import { getModalOption, getModalRequestPerforming } from '../../../../redux/selectors/modal';
import { getSelectedTeamId } from '../../../../redux/selectors/teamSelectors';
import { getWorkSpaceId } from '../../../../redux/selectors/userSelectors';
import { IUser } from '../../../../types/userTypes';
import { EmailInputFormFieldValidator, InputFormFieldValidator } from '../../../../utils/formUtils';
import { createUserPositionDropdownItems } from '../../../../utils/userUtils';
import UserModal, { IUserCreationProps } from './UserModal';

const UserModalContainer = () => {
    const dispatch = useDispatch();
    const userPositions = createUserPositionDropdownItems().filter((x) => x.value !== UserPosition.Customer);
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

    const validateField = (value: string): string =>
        new InputFormFieldValidator(value, null, null, true, BaseRegexExpression).validate();

    const validateEmail = (value: string): string => new EmailInputFormFieldValidator(value).validate();

    const validatePassword = (value: string): string => new InputFormFieldValidator(value, 3, 16, true).validate();

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
