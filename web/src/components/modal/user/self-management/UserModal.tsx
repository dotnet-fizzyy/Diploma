import { Avatar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Field, Form, Formik } from 'formik';
import React, { RefObject } from 'react';
import { InitialProfileUpdatePassword, PasswordsAreNotSameErrorMessage, UnspecifiedValue } from '../../../../constants';
import { passwordUpdateFields, userFields, ProjectPosition, UserRole } from '../../../../constants/user';
import { IProfilePasswordUpdateForm, IProfileSettingsForm } from '../../../../types/forms';
import { IFullUser } from '../../../../types/user';
import { getFirstLetter } from '../../../../utils';
import Button from '../../../common/Button';
import FormTextField from '../../../common/FormTextField';
import MainLabel, { LabelType } from '../../../common/MainLabel';
import ModalSpinner from '../../ModalSpinner';
import ModalCloseButtonContainer from '../../close-button/ModalCloseButtonContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '500px',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            overflowY: 'scroll',
            position: 'relative',
        },
        body: {
            paddingTop: '20px',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            position: 'relative',
        },
        photoContainer: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            flexGrow: 0,
            flexBasis: '170px',
            flexShrink: 0,
        },
        profileContainer: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
        },
        buttonContainer: {
            width: '160px',
            position: 'absolute',
            left: 0,
            bottom: 0,
        },
        uploadButtonContainer: {
            marginTop: '20px',
            width: '100%',
        },
        profilePhoto: {
            width: '120px',
            height: '120px',
            fontSize: '60px',
        },
        fieldContainer: {
            margin: '20px 0 0 30px',
            wordBreak: 'break-all',
            '&:first-child': {
                marginTop: 0,
            },
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            color: '#242126',
        },
        staticFieldLabel: {
            fontWeight: 'bold',
            marginRight: '5px',
        },
    })
);

export interface IUserModalProps {
    emailExists: boolean;
    isChangePassword: boolean;
    passwordsAreSame: boolean;
    isPerformingRequest: boolean;
    initialProfileSettings: IProfileSettingsForm;
    user: IFullUser;
    fileRef: RefObject<HTMLInputElement>;
    validateField: (value: string) => void;
    validateEmail: (value: string) => void;
    validatePassword: (value: string) => void;
    onClickUpdateAvatar: () => void;
    onClickResetPassword: () => void;
    onChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitUpdatePasswordButton: (values: IProfilePasswordUpdateForm) => void;
    onSubmitUpdateProfileSettingsButton: (values: IProfileSettingsForm) => void;
    onChangeEmailField: (value: string) => void;
}

const UserModal = (props: IUserModalProps) => {
    const classes = useStyles();
    const {
        emailExists,
        isPerformingRequest,
        isChangePassword,
        passwordsAreSame,
        initialProfileSettings,
        user: { userName, avatarLink, userPosition, userRole, projects, teams },
        fileRef,
        onClickUpdateAvatar,
        onClickResetPassword,
        onChangeFile,
        onSubmitUpdatePasswordButton,
        onSubmitUpdateProfileSettingsButton,
        validatePassword,
        validateField,
        validateEmail,
        onChangeEmailField,
    } = props;

    const passwordUpdate = (): React.ReactNode => (
        <Formik
            enableReinitialize={true}
            initialValues={InitialProfileUpdatePassword}
            onSubmit={onSubmitUpdatePasswordButton}
            validateOnBlur={false}
            validateOnChange={true}
        >
            {({ isValid, touched, initialValues }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;

                //Need to verify that reinitialization happened
                if (userFields.userName in initialValues || userFields.email in initialValues) {
                    return null;
                }

                return (
                    <div className={classes.profileContainer}>
                        <Form>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Old password"
                                    type="password"
                                    name={passwordUpdateFields.password}
                                    component={FormTextField}
                                    validate={validatePassword}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="New password"
                                    type="password"
                                    name={passwordUpdateFields.newPassword}
                                    component={FormTextField}
                                    validate={validatePassword}
                                    customError={!passwordsAreSame ? PasswordsAreNotSameErrorMessage : ''}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Repeat your new password"
                                    type="password"
                                    name={passwordUpdateFields.repeatedPassword}
                                    component={FormTextField}
                                    validate={validatePassword}
                                    customError={!passwordsAreSame ? PasswordsAreNotSameErrorMessage : ''}
                                />
                            </div>
                            {getSaveChangesButton(!isAnyFieldTouched || !isValid)}
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );

    const profileSettings = (): React.ReactNode => (
        <Formik
            enableReinitialize={true}
            initialValues={initialProfileSettings}
            onSubmit={onSubmitUpdateProfileSettingsButton}
            validateOnBlur={false}
            validateOnChange={true}
        >
            {({ initialValues, values, isValid }) => {
                const areValuesSame: boolean =
                    values.email === initialValues.email && values.userName === initialValues.userName;

                //Need to verify that reinitialization happened
                if (
                    passwordUpdateFields.password in initialValues ||
                    passwordUpdateFields.newPassword in initialValues ||
                    passwordUpdateFields.repeatedPassword in initialValues
                ) {
                    return null;
                }

                return (
                    <div className={classes.profileContainer}>
                        <Form>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Name"
                                    name={userFields.userName}
                                    component={FormTextField}
                                    validate={validateField}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Email"
                                    name={userFields.email}
                                    component={FormTextField}
                                    validate={validateEmail}
                                    customError={emailExists ? 'This email is already taken' : ''}
                                    onChangeCallback={onChangeEmailField}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <span className={classnames(classes.text, classes.staticFieldLabel)}>Position:</span>
                                <span className={classes.text}>{ProjectPosition[userPosition]}</span>
                            </div>
                            <div className={classes.fieldContainer}>
                                <span className={classnames(classes.text, classes.staticFieldLabel)}>Role:</span>
                                <span className={classes.text}>{UserRole[userRole]}</span>
                            </div>
                            <div className={classes.fieldContainer}>
                                <span className={classnames(classes.text, classes.staticFieldLabel)}>Projects:</span>
                                {projects && projects.length ? (
                                    projects.map((x, index) => (
                                        <span key={x.projectId} className={classes.text}>
                                            {x.projectName || UnspecifiedValue}
                                            {index !== projects.length - 1 ? ', ' : ''}
                                        </span>
                                    ))
                                ) : (
                                    <span className={classes.text}>-</span>
                                )}
                            </div>
                            <div className={classes.fieldContainer}>
                                <span className={classnames(classes.text, classes.staticFieldLabel)}>Teams:</span>
                                {teams && teams.length ? (
                                    teams.map((x, index) => (
                                        <span key={x.teamId} className={classes.text}>
                                            {x.teamName || UnspecifiedValue}
                                            {index !== teams.length - 1 ? ', ' : ''}
                                        </span>
                                    ))
                                ) : (
                                    <span className={classes.text}>-</span>
                                )}
                            </div>
                            {getSaveChangesButton(areValuesSame || !isValid)}
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );

    const getSaveChangesButton = (disabled: boolean): React.ReactNode => (
        <div className={classes.buttonContainer}>
            <Button label="Save changes" type="submit" disabled={disabled} />
        </div>
    );

    return (
        <div className={classes.root}>
            <MainLabel title="Profile settings" variant={LabelType.PRIMARY} />
            <ModalCloseButtonContainer />
            {isPerformingRequest && <ModalSpinner />}
            <div className={classes.body}>
                <div className={classes.photoContainer}>
                    <Avatar alt="Your image" src={avatarLink} className={classes.profilePhoto}>
                        {getFirstLetter(userName)}
                    </Avatar>
                    <div className={classes.uploadButtonContainer}>
                        <Button label="Upload image" disabled={false} onClick={onClickUpdateAvatar} />
                        <input type="file" ref={fileRef} hidden={true} onChange={onChangeFile} />
                    </div>
                    <div className={classes.uploadButtonContainer}>
                        <Button
                            label={isChangePassword ? 'Cancel' : 'Reset password'}
                            disabled={false}
                            onClick={onClickResetPassword}
                        />
                    </div>
                </div>
                {isChangePassword ? passwordUpdate() : profileSettings()}
            </div>
        </div>
    );
};

export default UserModal;
