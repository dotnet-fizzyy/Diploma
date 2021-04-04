import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { InitialWorkSpaceFormValues, WorkSpaceFields } from '../../../constants/workSpaceContants';
import { IWorkSpaceForm } from '../../../types/formTypes';
import Button from '../../common/Button';
import FormTextArea from '../../common/FormTextArea';
import FormTextField from '../../common/FormTextField';
import MainLabel, { LabelType } from '../../common/MainLabel';
import ModalCloseButtonContainer from '../close-button/ModalCloseButtonContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            width: '100%',
            height: 'max-content',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            position: 'relative',
        },
        fieldContainer: {
            marginTop: '30px',
            width: '100%',
        },
        buttonContainer: {
            marginTop: '20px',
            width: '170px',
        },
    })
);

export interface IWorkSpaceModalProps {
    onSubmitButton: (values: IWorkSpaceForm) => void;
    validateWorkSpaceName: (value: string) => void;
}

const WorkSpaceModal = (props: IWorkSpaceModalProps) => {
    const classes = useStyles();
    const { onSubmitButton, validateWorkSpaceName } = props;

    return (
        <Formik
            initialValues={InitialWorkSpaceFormValues}
            onSubmit={onSubmitButton}
            validateOnBlur={false}
            validateOnChange={true}
        >
            {({ isValid, touched }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;

                return (
                    <div className={classes.root}>
                        <Form>
                            <MainLabel title="Create workspace" variant={LabelType.PRIMARY} />
                            <ModalCloseButtonContainer />
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Name"
                                    name={WorkSpaceFields.workSpaceName}
                                    component={FormTextField}
                                    validate={validateWorkSpaceName}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Description"
                                    placeholder="Add full and clean description for your workspace"
                                    minHeight="133px"
                                    name={WorkSpaceFields.workSpaceDescription}
                                    component={FormTextArea}
                                />
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button
                                    disabled={!isAnyFieldTouched || (isAnyFieldTouched && !isValid)}
                                    type="submit"
                                    label="Create Workspace"
                                />
                            </div>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default WorkSpaceModal;
