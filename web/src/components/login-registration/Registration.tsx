import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
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
        },
        textInput: {
            fontFamily: 'Poppins',
            fontSize: '20px',
        },
    })
);

export interface IRegistrationPageProps {
    name: string;
    password: string;
    repeatedPassword: string;
    onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeRepeatedPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitRegistration: () => void;
}

const RegistrationPage = (props: IRegistrationPageProps) => {
    const classes = useStyles();
    const {
        name,
        password,
        repeatedPassword,
        onChangeName,
        onChangePassword,
        onChangeRepeatedPassword,
        onSubmitRegistration,
    } = props;

    return (
        <div className={classes.root}>
            <span className={classes.title}>Registration</span>
            <TextField
                className={classes.textField}
                InputProps={{ classes: { input: classes.textInput } }}
                value={name}
                onChange={onChangeName}
            />
            <span className={classes.keyWord}>Name</span>
            <TextField className={classes.textField} type="password" value={password} onChange={onChangePassword} />
            <span className={classes.keyWord}>Password</span>
            <TextField
                className={classes.textField}
                type="password"
                value={repeatedPassword}
                onChange={onChangeRepeatedPassword}
            />
            <span className={classes.keyWord}>Confirm your password</span>
            <div className={classes.linkContainer}>
                <span>Do you have account?</span>
                <Link to={routeConstants.LoginScreenRoute}>Sign in</Link>
            </div>
            <Button className={classes.button} color="primary" variant="contained" onClick={onSubmitRegistration}>
                Create your account
            </Button>
        </div>
    );
};

export default RegistrationPage;
