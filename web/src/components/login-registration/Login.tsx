import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        textField: {
            width: '350px',
            marginTop: '30px',
        },
        title: {
            fontSize: '34px',
            fontFamily: 'Poppins',
            marginBottom: '20px',
        },
        linkContainer: {
            display: 'inherit',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '40px 0',
            fontFamily: 'Poppins',
            fontSize: '22px',
            '& a': {
                marginTop: '10px',
                textDecoration: 'none',
            },
        },
        keyWord: {
            marginTop: '10px',
            fontFamily: 'Poppins',
            fontSize: '20px',
        },
        button: {
            height: '45px',
            fontFamily: 'Poppins',
            fontSize: '18px',
            textTransform: 'capitalize',
            width: '150px',
        },
        textInput: {
            fontFamily: 'Poppins',
            fontSize: '20px',
        },
        errorMessage: {
            marginTop: '30px',
            fontFamily: 'Poppins',
            fontSize: '20px',
            color: 'red',
        },
        errorMessageMargin: {
            marginTop: '30px',
        },
    })
);

export interface ILoginPageProps {
    name: string;
    password: string;
    wasAttemptToLogIn: boolean;
    onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitLogIn: () => void;
}

const LoginPage = (props: ILoginPageProps) => {
    const classes = useStyles();
    const { name, password, wasAttemptToLogIn, onChangeName, onChangePassword, onSubmitLogIn } = props;

    return (
        <div className={classes.root}>
            <span className={classes.title}>Sign In</span>
            <TextField
                InputProps={{ classes: { input: classes.textInput } }}
                className={classes.textField}
                value={name}
                onChange={onChangeName}
            />
            <span className={classes.keyWord}>Name</span>
            <TextField
                InputProps={{ classes: { input: classes.textInput } }}
                className={classes.textField}
                type="password"
                value={password}
                onChange={onChangePassword}
            />
            <span className={classes.keyWord}>Password</span>
            {wasAttemptToLogIn && (
                <span className={classes.errorMessage}>Unable to login with following credentials</span>
            )}
            <div className={classnames(classes.linkContainer, { [classes.errorMessageMargin]: wasAttemptToLogIn })}>
                <span>Don't you have project yet?</span>
                <Link to={`${routeConstants.RegistrationScreenRoute}`}>Create it!</Link>
            </div>
            <Button className={classes.button} color="primary" variant="contained" onClick={onSubmitLogIn}>
                Sign in
            </Button>
        </div>
    );
};

export default LoginPage;
