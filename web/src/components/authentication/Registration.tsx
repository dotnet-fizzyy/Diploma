import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { InitialRegistrationFormValues, RegistrationFormConstants } from '../../constants';
import * as routeConstants from '../../constants/routes';
import LogoIcon from '../../static/app-logo.svg';
import { IRegistrationForm } from '../../types/forms';
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
        },
        linkContainer: {
            display: 'inherit',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '20px 0',
            fontFamily: 'Poppins',
            fontSize: '16px',
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
            width: '100%',
            maxWidth: '450px',
            marginTop: '20px',
        },
        keyWord: {
            fontFamily: 'Poppins',
            fontSize: '22px',
            color: '#75BAF7',
        },
        textInput: {
            fontFamily: 'Poppins',
            fontSize: '20px',
        },
        createdAccountLabel: {
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '18px',
            color: '#00e200',
        },
        lessMarginBottom: {
            marginBottom: '20px',
        },
        spinnerContainer: {
            marginTop: '20px',
        },
        buttonContainer: {
            width: '250px',
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

export interface IRegistrationPageProps {
    emailExists: boolean;
    isLoading: boolean;
    wasUserCreated: boolean;
    arePasswordsSame: boolean;
    validateField: (value: string) => void;
    validateEmail: (value: string) => void;
    validatePassword: (value: string) => void;
    onChangeEmailField: (value: string) => void;
    onSubmitRegistration: (values: IRegistrationForm) => void;
}

const RegistrationPage = (props: IRegistrationPageProps) => {
    const classes = useStyles();
    const {
        emailExists,
        arePasswordsSame,
        isLoading,
        wasUserCreated,
        validatePassword,
        validateField,
        validateEmail,
        onSubmitRegistration,
        onChangeEmailField,
    } = props;

    return (
        <Formik initialValues={InitialRegistrationFormValues} onSubmit={onSubmitRegistration}>
            {({ isValid, touched }) => {
                const isAnyFieldTouched: boolean = isNotEmpty(touched);
                const passwordError: string = !arePasswordsSame ? 'Provided passwords are different' : '';

                return (
                    <Form className={classes.form}>
                        <div className={classes.root}>
                            <div className={classes.logo} />
                            <span className={classes.title}>Registration</span>

                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Email"
                                    name={RegistrationFormConstants.email}
                                    component={FormTextField}
                                    validate={validateEmail}
                                    onChangeCallback={onChangeEmailField}
                                    customError={emailExists ? 'This email is already taken' : ''}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Name"
                                    name={RegistrationFormConstants.name}
                                    component={FormTextField}
                                    validate={validateField}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Password"
                                    name={RegistrationFormConstants.password}
                                    type="password"
                                    component={FormTextField}
                                    validate={validatePassword}
                                    customError={passwordError}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Repeat your password"
                                    name={RegistrationFormConstants.repeatedPassword}
                                    type="password"
                                    component={FormTextField}
                                    validate={validatePassword}
                                    customError={passwordError}
                                />
                            </div>

                            <ForwardLink
                                mainLabel="Do you have account?"
                                link={routeConstants.LoginScreenRoute}
                                linkLabel="Sign in"
                            />

                            <div className={classes.buttonContainer}>
                                <Button
                                    disabled={!isAnyFieldTouched || !isValid}
                                    type="submit"
                                    label="Create your account"
                                />
                            </div>

                            <div className={classes.spinnerContainer}>
                                {isLoading && <Spinner size={28} />}

                                {wasUserCreated && (
                                    <span className={classes.createdAccountLabel}>
                                        Your account was successfully created!
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

export default RegistrationPage;
