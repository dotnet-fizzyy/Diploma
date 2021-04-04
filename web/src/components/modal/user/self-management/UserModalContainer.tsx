import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../../constants';
import {
    updateAvatarRequest,
    updatePasswordRequest,
    updateProfileSettingsRequest,
} from '../../../../redux/actions/userActions';
import { getUser } from '../../../../redux/selectors/userSelectors';
import { IProfilePasswordUpdateForm, IProfileSettingsForm } from '../../../../types/formTypes';
import { IUser } from '../../../../types/userTypes';
import { EmailInputFormFieldValidator, InputFormFieldValidator } from '../../../../utils/formHelper';
import UserModal, { IUserModalProps } from './UserModal';

const UserModalContainer = () => {
    const dispatch = useDispatch();
    const fileRef = useRef<HTMLInputElement>(null);
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
    const [passwordsAreSame, setPasswordsAreSame] = useState<boolean>(true);
    const user: IUser = useSelector(getUser);

    const initialProfileSettings: IProfileSettingsForm = {
        userName: user.userName,
        email: user.email,
    };

    const validateField = (value: string): string =>
        new InputFormFieldValidator(value, null, null, true, BaseRegexExpression).validate();

    const validateEmail = (value: string): string => new EmailInputFormFieldValidator(value).validate();

    const validatePassword = (value: string): string => new InputFormFieldValidator(value, 3, 16, true).validate();

    const onClickUpdateAvatar = (): void => {
        if (fileRef && fileRef.current) {
            fileRef.current.click();
        }
    };

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files && event.target.files.length) {
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
        isChangePassword,
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
    };

    return <UserModal {...userModalProps} />;
};

export default UserModalContainer;
