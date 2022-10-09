import React, { useEffect, useMemo, useState } from 'react';
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
import { isNotEmpty } from '../../utils';
import { validateEmailInputFormField, validateInputFormField } from '../../utils/forms';
import StartScreen, { IStartScreenProps } from './StartScreen';

const StartScreenContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { path } = useRouteMatch();
    const startPagePath = useMemo(() => path.split('/')?.[2], [path]);
    const startPageType = useMemo(
        () =>
            startPagePath?.toUpperCase() === StartPageTypes.REGISTRATION
                ? StartPageTypes.REGISTRATION
                : StartPageTypes.LOGIN,
        [startPagePath]
    );

    const isAuthenticationSuccessful = useSelector(getIsAuthenticationSuccessful);
    const isLoading = useSelector(getIsUserLoading);
    const wasUserCreated = useSelector(getWasCustomerCreated);
    const user = useSelector(getUser);
    const emailExists = useSelector(getEmailExistence);

    const [arePasswordsSame, setSamePasswords] = useState<boolean>(true);
    const [wasAttemptToLogIn, setWasAttemptToLogIn] = useState<boolean>(false);

    const requiredField = (value: string): string => {
        const isRequired = true;

        return validateInputFormField(value, isRequired);
    };

    const validateField = (value: string): string => {
        const isRequired = true;
        const minLength = null;
        const maxLength = null;

        return validateInputFormField(value, isRequired, minLength, maxLength, BaseRegexExpression);
    };

    const validateEmail = (value: string): string => {
        const isRequired = true;

        return validateEmailInputFormField(value, isRequired);
    };

    const validatePassword = (value: string): string => {
        const isRequired = true;
        const minLength = 3;
        const maxLength = 16;

        return validateInputFormField(value, isRequired, minLength, maxLength);
    };

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wasUserCreated]);

    useEffect(() => {
        if (isNotEmpty(user)) {
            history.push(DefaultRoute);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return <StartScreen {...startScreenProps} />;
};

export default StartScreenContainer;
