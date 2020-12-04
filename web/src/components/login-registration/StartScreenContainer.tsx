import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import * as currentUserActions from '../../redux/actions/currentUserActions';
import * as currentUserSelectors from '../../redux/selectors/userSelectors';
import { StartPageTypes } from '../../types/pageTypes';
import { ILoginPageProps } from './Login';
import { IRegistrationPageProps } from './Registration';
import StartScreen, { IStartScreenProps } from './StartScreen';

const StartScreenContainer = () => {
    const dispatch = useDispatch();

    const { path } = useRouteMatch();
    const startPage = path.split('/')[2];
    const startPageType =
        startPage.toUpperCase() === StartPageTypes.REGISTRATION ? StartPageTypes.REGISTRATION : StartPageTypes.LOGIN;

    const isAuthenticationSuccessful = useSelector(currentUserSelectors.getIsAuthenticationSuccessful);

    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');
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
        wasAttemptToLogIn: wasAttemptToLogIn && !isAuthenticationSuccessful,
        onChangeName,
        onChangePassword,
        onSubmitLogIn: () => {
            setWasAttemptToLogIn(true);
            dispatch(currentUserActions.authenticationRequest(name, password));
        },
    };

    const registrationProps: IRegistrationPageProps = {
        name,
        password,
        repeatedPassword,
        onChangeName,
        onChangePassword,
        onChangeRepeatedPassword: (event: React.ChangeEvent<HTMLInputElement>) =>
            setRepeatedPassword(event.target.value),
        onSubmitRegistration: () => dispatch(currentUserActions.registrationRequest(name, password)),
    };

    const startScreenProps: IStartScreenProps = {
        startPageType,
        loginProps,
        registrationProps,
    };

    return <StartScreen {...startScreenProps} />;
};

export default StartScreenContainer;
