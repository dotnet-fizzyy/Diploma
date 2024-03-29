import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { projectFields } from '../../../constants/projectConstants';
import { IProjectForm } from '../../../types/formTypes';
import { IProject } from '../../../types/projectTypes';
import Button from '../../common/Button';
import FormDatePicker from '../../common/FormDatePicker';
import FormTextArea from '../../common/FormTextArea';
import FormTextField from '../../common/FormTextField';
import MainLabel, { LabelType } from '../../common/MainLabel';
import ModalSpinner from '../ModalSpinner';
import ModalCloseButtonContainer from '../close-button/ModalCloseButtonContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '600px',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            overflowY: 'scroll',
            position: 'relative',

            '@media(min-width:789px)': {
                minWidth: '590px',
            },
        },
        buttonContainer: {
            marginTop: '20px',
            width: '170px',
        },
        title: {
            fontFamily: 'Poppins, sans-serif',
            color: '#75BAF7',
            fontSize: '18px',
        },
        fieldContainer: {
            marginTop: '20px',
            width: '100%',
        },
    })
);

export interface IProjectCreationProps {
    isPerformingRequest: boolean;
    initialValues: IProject;
    isUpdate: boolean;
    onSubmitProjectHandling: (values: IProjectForm) => void;
    validateProjectName: (value: string) => string;
}

const ProjectModal = (props: IProjectCreationProps) => {
    const classes = useStyles();
    const { isPerformingRequest, initialValues, isUpdate, onSubmitProjectHandling, validateProjectName } = props;

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmitProjectHandling}
            validateOnBlur={false}
            validateOnChange={true}
        >
            {({ isValid, touched }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;

                return (
                    <Form>
                        <div className={classes.root}>
                            <MainLabel
                                title={`${isUpdate ? 'Update' : 'Create new'} project`}
                                variant={LabelType.PRIMARY}
                            />
                            <ModalCloseButtonContainer />
                            {isPerformingRequest && <ModalSpinner />}
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Name"
                                    name={projectFields.projectName}
                                    component={FormTextField}
                                    validate={validateProjectName}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Project Description"
                                    placeholder={`${
                                        isUpdate ? 'Update' : 'Add full and clean'
                                    } description for your project`}
                                    minHeight="113px"
                                    name={projectFields.projectDescription}
                                    component={FormTextArea}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field label="Start Date" name={projectFields.startDate} component={FormDatePicker} />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field label="End Date" name={projectFields.endDate} component={FormDatePicker} />
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button
                                    disabled={!isAnyFieldTouched || !isValid}
                                    type="submit"
                                    label={`${isUpdate ? 'Update' : 'Create'} project`}
                                />
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ProjectModal;
