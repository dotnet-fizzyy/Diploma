import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import LoginPage, { ILoginPageProps } from '../../components/authentication/Login';
import RegistrationPage, { IRegistrationPageProps } from '../../components/authentication/Registration';
import { StartPageTypes } from '../../constants';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
);

export interface IStartScreenProps {
    startPageType: StartPageTypes;
    loginProps: ILoginPageProps;
    registrationProps: IRegistrationPageProps;
}

const StartScreen = (props: IStartScreenProps) => {
    const classes = useStyles();
    const { startPageType, registrationProps, loginProps } = props;

    const getStartPage = () => {
        switch (startPageType) {
            case StartPageTypes.LOGIN:
                return <LoginPage {...loginProps} />;
            case StartPageTypes.REGISTRATION:
                return <RegistrationPage {...registrationProps} />;
            default:
                return null;
        }
    };

    return <div className={classes.root}>{getStartPage()}</div>;
};

export default StartScreen;
