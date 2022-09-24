import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../../constants';
import {
    checkEmailExistenceRequest,
    resetEmailExistence,
    updateAvatarRequest,
    updatePasswordRequest,
    updateProfileSettingsRequest,
} from '../../../../redux/actions/user';
import { getModalRequestPerforming } from '../../../../redux/selectors/modal';
import { getEmailExistence, getUser } from '../../../../redux/selectors/user';
import { IProfilePasswordUpdateForm, IProfileSettingsForm } from '../../../../types/forms';
import { IFullUser, IUser } from '../../../../types/user';
import { isNotEmpty } from '../../../../utils';
import { validateEmailInputFormField, validateInputFormField } from '../../../../utils/forms';
import UserModal, { IUserModalProps } from './UserModal';

const UserModalContainer = () => {
    const dispatch = useDispatch();

    const user: IFullUser = useSelector(getUser);
    const isPerformingRequest: boolean = useSelector(getModalRequestPerforming);
    const emailExists: boolean = useSelector(getEmailExistence);

    const fileRef = useRef<HTMLInputElement>(null);
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
    const [passwordsAreSame, setPasswordsAreSame] = useState<boolean>(true);

    const initialProfileSettings: IProfileSettingsForm = {
        userName: user.userName,
        email: user.email,
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

    const onClickUpdateAvatar = (): void => {
        if (isNotEmpty(fileRef?.current)) {
            fileRef.current.click();
        }
    };

    const onChangeEmailField = (value: string): void => {
        if (!validateEmail(value)) {
            dispatch(checkEmailExistenceRequest(value));
        }

        if (emailExists) {
            dispatch(resetEmailExistence());
        }
    };

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (isNotEmpty(event.target.files)) {
            dispatch(updateAvatarRequest(event.target.files[0], user.userId));
        }
    };

    const onSubmitUpdatePasswordButton = (values: IProfilePasswordUpdateForm): void => {
        if (values.newPassword !== values.repeatedPassword) {
            setPasswordsAreSame(false);

            return;
        }

        setPasswordsAreSame(true);
        dispatch(updatePasswordRequest(values.password, values.newPassword));
    };

    const onSubmitUpdateProfileSettingsButton = (values: IProfileSettingsForm): void => {
        const updatedUser: IUser = {
            ...user,
            userName: values.userName,
            email: values.email,
        };

        dispatch(updateProfileSettingsRequest(updatedUser));
    };

    const onClickResetPassword = (): void => {
        setIsChangePassword(!isChangePassword);
    };

    const userModalProps: IUserModalProps = {
        emailExists,
        isChangePassword,
        isPerformingRequest,
        passwordsAreSame,
        initialProfileSettings,
        user,
        fileRef,
        validateField,
        validateEmail,
        validatePassword,
        onSubmitUpdatePasswordButton,
        onSubmitUpdateProfileSettingsButton,
        onClickResetPassword,
        onClickUpdateAvatar,
        onChangeFile,
        onChangeEmailField,
    };

    return <UserModal {...userModalProps} />;
};

export default UserModalContainer;
