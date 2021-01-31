import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';
import * as currentUserActions from '../../redux/actions/currentUserActions';
import * as requestProcessorActions from '../../redux/actions/requestProcessorActions';
import * as requestProcessorSelectors from '../../redux/selectors/requestProcessorSelectors';
import * as currentUserSelectors from '../../redux/selectors/userSelectors';
import { SpinnerComponent } from '../../types';
import { ILoginForm, IRegistrationForm } from '../../types/formTypes';
import { StartPageTypes } from '../../types/pageTypes';
import { InputFormFieldValidator } from '../../utils/formHelper';
import { ILoginPageProps } from './Login';
import { IRegistrationPageProps } from './Registration';
import StartScreen, { IStartScreenProps } from './StartScreen';

const StartScreenContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { path } = useRouteMatch();
    const startPage = path.split('/')[2];
    const startPageType =
        startPage.toUpperCase() === StartPageTypes.REGISTRATION ? StartPageTypes.REGISTRATION : StartPageTypes.LOGIN;

    const isAuthenticationSuccessful = useSelector(currentUserSelectors.getIsAuthenticationSuccessful);
    const wasUserCreated = useSelector(currentUserSelectors.getWasCustomerCreated);
    const user = useSelector(currentUserSelectors.getUser);
    const isSpinnerVisible = useSelector(requestProcessorSelectors.getIsSpinnerVisible);

    const [arePasswordsSame, setSamePasswords] = useState<boolean>(true);
    const [wasAttemptToLogIn, setWasAttemptToLogIn] = useState<boolean>(false);

    const loginProps: ILoginPageProps = {
        isSpinnerVisible,
        wasAttemptToLogIn: wasAttemptToLogIn && !isAuthenticationSuccessful,
        validateField: (value: string) => new InputFormFieldValidator(value).validate(),
        onSubmitLogIn: (values: ILoginForm) => {
            setWasAttemptToLogIn(true);
            dispatch(requestProcessorActions.launchSpinner(SpinnerComponent.LOGIN));
            dispatch(currentUserActions.authenticationRequest(values.name, values.password));
        },
    };

    const registrationProps: IRegistrationPageProps = {
        wasUserCreated,
        arePasswordsSame,
        isSpinnerVisible,
        onSubmitRegistration: (values: IRegistrationForm) => {
            if (values.password !== values.repeatedPassword) {
                setSamePasswords(false);

                return;
            }

            setSamePasswords(true);
            dispatch(requestProcessorActions.launchSpinner(SpinnerComponent.LOGIN));
            dispatch(currentUserActions.registrationRequest(values.name, values.password));
        },
    };

    const startScreenProps: IStartScreenProps = {
        startPageType,
        loginProps,
        registrationProps,
    };

    useEffect(() => {
        if (wasUserCreated) {
            setTimeout(() => {
                dispatch(currentUserActions.hideCustomerSuccessfulRegistration());
            }, 5000);
        }
    }, [dispatch, wasUserCreated]);

    useEffect(() => {
        if (user) {
            history.push(routeConstants.DefaultRoute);
        }
    }, [user, history]);

    return <StartScreen {...startScreenProps} />;
};

export default StartScreenContainer;
