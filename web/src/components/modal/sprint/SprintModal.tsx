import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { SprintFields } from '../../../constants/sprint';
import { ISprint } from '../../../types/sprint';
import Button from '../../common/Button';
import FormDatePicker from '../../common/FormDatePicker';
import FormTextField from '../../common/FormTextField';
import MainLabel, { LabelType } from '../../common/MainLabel';
import ModalAdditionalInfo from '../ModalAdditionalInfo';
import ModalSpinner from '../ModalSpinner';
import ModalCloseButtonContainer from '../close-button/ModalCloseButtonContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '500px',
            width: '100%',
            height: 'max-content',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            overflowY: 'scroll',
            position: 'relative',
        },
        fieldContainer: {
            marginTop: '20px',
            width: '100%',
        },
        buttonContainer: {
            marginTop: '30px',
            width: '150px',
        },
    })
);

export interface ISprintCreationProps {
    initialValues: ISprint;
    isPerformingRequest: boolean;
    isUpdate: boolean;
    onSubmitButton: (values: ISprint) => void;
    validateSprintName: (value: string) => string;
}

const SprintModal = (props: ISprintCreationProps) => {
    const classes = useStyles();
    const { initialValues, isPerformingRequest, isUpdate, onSubmitButton, validateSprintName } = props;

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitButton} validateOnBlur={false} validateOnChange={true}>
            {({ isValid, touched }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;

                return (
                    <div className={classes.root}>
                        <Form>
                            <MainLabel
                                title={`${isUpdate ? 'Update' : 'Create new'} sprint`}
                                variant={LabelType.PRIMARY}
                            />
                            <ModalCloseButtonContainer />
                            {isPerformingRequest && <ModalSpinner />}
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Name"
                                    name={SprintFields.sprintName}
                                    component={FormTextField}
                                    validate={validateSprintName}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field label="Start date" name={SprintFields.startDate} component={FormDatePicker} />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field label="End date" name={SprintFields.endDate} component={FormDatePicker} />
                            </div>
                            {!isUpdate && (
                                <div className={classes.fieldContainer}>
                                    <ModalAdditionalInfo />
                                </div>
                            )}
                            <div className={classes.buttonContainer}>
                                <Button
                                    label={`${isUpdate ? 'Update' : 'Create'} sprint`}
                                    type="submit"
                                    disabled={!isUpdate && (!isAnyFieldTouched || (isAnyFieldTouched && !isValid))}
                                />
                            </div>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default SprintModal;
