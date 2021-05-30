import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ILoginPageProps } from '../../components/authentication/Login';
import { IRegistrationPageProps } from '../../components/authentication/Registration';
import { BaseRegexExpression, StartPageTypes } from '../../constants';
import { DefaultRoute } from '../../constants/routeConstants';
import {
    authenticationRequest,
    hideCustomerSuccessfulRegistration,
    registrationRequest,
} from '../../redux/actions/userActions';
import {
    getIsAuthenticationSuccessful,
    getIsUserLoading,
    getUser,
    getWasCustomerCreated,
} from '../../redux/selectors/userSelectors';
import { ILoginForm, IRegistrationForm } from '../../types/formTypes';
import { IFullUser } from '../../types/userTypes';
import { EmailInputFormFieldValidator, InputFormFieldValidator } from '../../utils/formUtils';
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

    const [arePasswordsSame, setSamePasswords] = useState<boolean>(true);
    const [wasAttemptToLogIn, setWasAttemptToLogIn] = useState<boolean>(false);

    const requiredField = (value: string): string => new InputFormFieldValidator(value, null, null, true).validate();
    const validateField = (value: string): string =>
        new InputFormFieldValidator(value, null, null, true, BaseRegexExpression).validate();
    const validateEmail = (value: string): string => new EmailInputFormFieldValidator(value).validate();
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

    const loginProps: ILoginPageProps = {
        isLoading,
        wasAttemptToLogIn: wasAttemptToLogIn && !isAuthenticationSuccessful && !isLoading,
        onSubmitLogIn,
        requiredField,
    };

    const registrationProps: IRegistrationPageProps = {
        isLoading,
        wasUserCreated,
        customError: !arePasswordsSame ? 'Provided passwords are different' : '',
        validateField,
        validatePassword,
        validateEmail,
        onSubmitRegistration,
        requiredField,
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
