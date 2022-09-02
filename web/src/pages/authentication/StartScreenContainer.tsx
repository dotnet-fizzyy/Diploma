import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ILoginPageProps } from '../../components/authentication/Login';
import { IRegistrationPageProps } from '../../components/authentication/Registration';
import { BaseRegexExpression, StartPageTypes } from '../../constants';
import { DefaultRoute } from '../../constants/routes';
import {
    authenticationRequest,
    checkEmailExistenceRequest,
    hideCustomerSuccessfulRegistration,
    registrationRequest,
    resetEmailExistence,
} from '../../redux/actions/user';
import {
    getEmailExistence,
    getIsAuthenticationSuccessful,
    getIsUserLoading,
    getUser,
    getWasCustomerCreated,
} from '../../redux/selectors/user';
import { ILoginForm, IRegistrationForm } from '../../types/forms';
import { IFullUser } from '../../types/user';
import { EmailInputFormFieldValidator, InputFormFieldValidator } from '../../utils/forms';
import StartScreen, { IStartScreenProps } from './StartScreen';

const StartScreenContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { path } = useRouteMatch();
    const startPage = path.split('/')[2];
    const startPageType =
        startPage.toUpperCase() === StartPageTypes.REGISTRATION ? StartPageTypes.REGISTRATION : StartPageTypes.LOGIN;

    const isAuthenticationSuccessful: boolean = useSelector(getIsAuthenticationSuccessful);
    const isLoading: boolean = useSelector(getIsUserLoading);
    const wasUserCreated: boolean = useSelector(getWasCustomerCreated);
    const user: IFullUser = useSelector(getUser);
    const emailExists: boolean = useSelector(getEmailExistence);

    const [arePasswordsSame, setSamePasswords] = useState<boolean>(true);
    const [wasAttemptToLogIn, setWasAttemptToLogIn] = useState<boolean>(false);

    const requiredField = (value: string): string => new InputFormFieldValidator(value, null, null, true).validate();
    const validateField = (value: string): string =>
        new InputFormFieldValidator(value, null, null, true, BaseRegexExpression).validate();
    const validateEmail = (value: string): string => new EmailInputFormFieldValidator(value, true).validate();
    const validatePassword = (value: string): string => new InputFormFieldValidator(value, 3, 16, true).validate();

    const onSubmitLogIn = (values: ILoginForm) => {
        setWasAttemptToLogIn(true);
        dispatch(authenticationRequest(values.email, values.password));
    };

    const onSubmitRegistration = (values: IRegistrationForm) => {
        if (values.password !== values.repeatedPassword) {
            setSamePasswords(false);

            return;
        }

        setSamePasswords(true);
        dispatch(registrationRequest(values.email, values.password, values.name));
    };

    const onChangeEmailField = (value: string): void => {
        if (!validateEmail(value)) {
            dispatch(checkEmailExistenceRequest(value));
        }

        if (emailExists) {
            dispatch(resetEmailExistence());
        }
    };

    const loginProps: ILoginPageProps = {
        isLoading,
        wasAttemptToLogIn: wasAttemptToLogIn && !isAuthenticationSuccessful && !isLoading,
        onSubmitLogIn,
        requiredField,
    };

    const registrationProps: IRegistrationPageProps = {
        emailExists,
        isLoading,
        wasUserCreated,
        arePasswordsSame,
        validateField,
        validatePassword,
        validateEmail,
        onSubmitRegistration,
        onChangeEmailField,
    };

    const startScreenProps: IStartScreenProps = {
        startPageType,
        loginProps,
        registrationProps,
    };

    useEffect(() => {
        if (wasUserCreated) {
            setTimeout(() => {
                dispatch(hideCustomerSuccessfulRegistration());
            }, 5000);
        }
    }, [dispatch, wasUserCreated]);

    useEffect(() => {
        if (user) {
            history.push(DefaultRoute);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return <StartScreen {...startScreenProps} />;
};

export default StartScreenContainer;
