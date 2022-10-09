import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { InitialLoginFormValues, LoginFormConstants } from '../../constants';
import * as routeConstants from '../../constants/routes';
import LogoIcon from '../../static/app-logo.svg';
import { ILoginForm } from '../../types/forms';
import { isNotEmpty } from '../../utils';
import Button from '../common/Button';
import FormTextField from '../common/FormTextField';
import Spinner from '../common/Spinner';
import ForwardLink from './ForwardLink';

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            width: '100%',
            padding: '0 20px',
        },
        root: {
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        },
        textField: {
            width: '350px',
        },
        title: {
            fontSize: '30px',
            fontFamily: 'Poppins',
            marginBottom: '10px',
            color: '#242126',
        },
        fieldContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '450px',
            marginTop: '20px',
        },
        keyWord: {
            fontFamily: 'Poppins',
            fontSize: '22px',
            color: '#75BAF7',
        },
        buttonContainer: {
            width: '250px',
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
            fontSize: '18px',
            color: 'red',
            fontWeight: 500,
        },
        errorMessageMargin: {
            marginTop: '30px',
        },
        spinnerContainer: {
            marginTop: '20px',
        },
        logo: {
            width: '90px',
            height: '60px',
            backgroundImage: `url(${LogoIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            marginBottom: '30px',
        },
    })
);

export interface ILoginPageProps {
    isLoading: boolean;
    wasAttemptToLogIn: boolean;
    requiredField: (value: string) => string;
    onSubmitLogIn: (values: ILoginForm) => void;
}

const LoginPage = (props: ILoginPageProps) => {
    const classes = useStyles();
    const { wasAttemptToLogIn, onSubmitLogIn, requiredField, isLoading } = props;

    return (
        <Formik initialValues={InitialLoginFormValues} onSubmit={onSubmitLogIn}>
            {({ isValid, touched }) => {
                const isAnyFieldTouched: boolean = isNotEmpty(touched);

                return (
                    <Form className={classes.form}>
                        <div className={classes.root}>
                            <div className={classes.logo} />
                            <span className={classes.title}>Sign In</span>

                            <div className={classes.fieldContainer}>
                                <Field
                                    name={LoginFormConstants.email}
                                    label="Email"
                                    component={FormTextField}
                                    validate={requiredField}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    name={LoginFormConstants.password}
                                    label="Password"
                                    type="password"
                                    component={FormTextField}
                                    validate={requiredField}
                                />
                            </div>

                            <ForwardLink
                                mainLabel="Don't you an account yet?"
                                link={routeConstants.RegistrationScreenRoute}
                                linkLabel="Create it now!"
                            />

                            <div className={classes.buttonContainer}>
                                <Button disabled={!isAnyFieldTouched || !isValid} type="submit" label="Sign in" />
                            </div>

                            <div className={classes.spinnerContainer}>
                                {isLoading && <Spinner size={28} />}

                                {wasAttemptToLogIn && (
                                    <span className={classes.errorMessage}>
                                        Unable to login with following credentials
                                    </span>
                                )}
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LoginPage;
