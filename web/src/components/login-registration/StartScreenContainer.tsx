import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';
import * as currentUserActions from '../../redux/actions/currentUserActions';
import * as requestProcessorActions from '../../redux/actions/requestProcessorActions';
import * as requestProcessorSelectors from '../../redux/selectors/requestProcessorSelectors';
import * as currentUserSelectors from '../../redux/selectors/userSelectors';
import { SpinnerComponent } from '../../types';
import { StartPageTypes } from '../../types/pageTypes';
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

    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');
    const [arePasswordsSame, setSamePasswords] = useState<boolean>(true);
    const [wasAttemptToLogIn, setWasAttemptToLogIn] = useState<boolean>(false);

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const loginProps: ILoginPageProps = {
        name,
        password,
        isSpinnerVisible,
        wasAttemptToLogIn: wasAttemptToLogIn && !isAuthenticationSuccessful,
        onChangeName,
        onChangePassword,
        onSubmitLogIn: () => {
            setWasAttemptToLogIn(true);
            dispatch(requestProcessorActions.launchSpinner(SpinnerComponent.LOGIN));
            dispatch(currentUserActions.authenticationRequest(name, password));
        },
    };

    const registrationProps: IRegistrationPageProps = {
        name,
        password,
        repeatedPassword,
        wasUserCreated,
        arePasswordsSame,
        isSpinnerVisible,
        onChangeName,
        onChangePassword,
        onChangeRepeatedPassword: (event: React.ChangeEvent<HTMLInputElement>) =>
            setRepeatedPassword(event.target.value),
        onSubmitRegistration: () => {
            if (password !== repeatedPassword) {
                setSamePasswords(false);

                return;
            }

            setSamePasswords(true);
            dispatch(requestProcessorActions.launchSpinner(SpinnerComponent.LOGIN));
            dispatch(currentUserActions.registrationRequest(name, password));
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
