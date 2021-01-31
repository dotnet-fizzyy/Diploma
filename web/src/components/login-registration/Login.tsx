import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import { InitialLoginFormValues, LoginFormConstants } from '../../constants';
import * as routeConstants from '../../constants/routeConstants';
import { ILoginForm } from '../../types/formTypes';
import FormTextField from '../common/FormTextField';

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
        },
        title: {
            fontSize: '34px',
            fontFamily: 'Poppins',
            marginBottom: '20px',
            color: '#242126',
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
        fieldContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '450px',
            marginTop: '30px',
        },
        keyWord: {
            fontFamily: 'Poppins',
            fontSize: '22px',
            color: '#75BAF7',
        },
        button: {
            height: '45px',
            fontFamily: 'Poppins',
            fontSize: '18px',
            textTransform: 'capitalize',
            width: '150px',
            color: 'white',
            backgroundColor: '#75BAF7',
            boxShadow: 'none',
            transition: 'unset',
            '&:hover': {
                backgroundColor: '#E8F4FF',
                boxShadow: 'none',
            },
        },
        textInput: {
            fontFamily: 'Poppins',
            fontSize: '20px',
        },
        focusedInput: {
            borderColor: '#75BAF7',
            outline: 'none',
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
        spinnerMargin: {
            marginTop: '20px',
        },
        spinner: {
            color: '#75BAF7',
            fontSize: '20px',
            marginTop: '20px',
        },
    })
);

export interface ILoginPageProps {
    wasAttemptToLogIn: boolean;
    isSpinnerVisible: boolean;
    validateField: (value: string) => void;
    onSubmitLogIn: (values: ILoginForm) => void;
}

const LoginPage = (props: ILoginPageProps) => {
    const classes = useStyles();
    const { isSpinnerVisible, validateField, wasAttemptToLogIn, onSubmitLogIn } = props;

    return (
        <Formik initialValues={InitialLoginFormValues} onSubmit={onSubmitLogIn}>
            {({ isValid, touched }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;

                return (
                    <Form>
                        <div className={classes.root}>
                            <span className={classes.title}>Sign In</span>
                            <div className={classes.fieldContainer}>
                                <Field
                                    name={LoginFormConstants.name}
                                    label="Name"
                                    validate={validateField}
                                    component={FormTextField}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    name={LoginFormConstants.password}
                                    label="Password"
                                    type="password"
                                    validate={validateField}
                                    component={FormTextField}
                                />
                            </div>
                            {isSpinnerVisible && <CircularProgress className={classes.spinner} />}
                            {wasAttemptToLogIn && !isSpinnerVisible && (
                                <span className={classes.errorMessage}>Unable to login with following credentials</span>
                            )}
                            <div
                                className={classnames(classes.linkContainer, {
                                    [classes.errorMessageMargin]: wasAttemptToLogIn,
                                    [classes.spinnerMargin]: isSpinnerVisible,
                                })}
                            >
                                <span>Don't you have project yet?</span>
                                <Link to={`${routeConstants.RegistrationScreenRoute}`}>Create it!</Link>
                            </div>
                            <Button
                                type="submit"
                                disabled={!isAnyFieldTouched || !isValid}
                                className={classes.button}
                                color="primary"
                                variant="contained"
                            >
                                Sign in
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LoginPage;
