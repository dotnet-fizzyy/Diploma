import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { EpicFields, EpicInitialState } from '../../../constants/epicConstants';
import { IEpicFormTypes } from '../../../types/formTypes';
import Button from '../../common/Button';
import FormDatePicker from '../../common/FormDatePicker';
import FormTextArea from '../../common/FormTextArea';
import FormTextField from '../../common/FormTextField';
import MainLabel, { LabelType } from '../../common/MainLabel';
import ModalCloseButtonContainer from '../close-button/ModalCloseButtonContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '590px',
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
            marginTop: '20px',
            width: '200px',
        },
    })
);

export interface IEpicCreationProps {
    isUpdate: boolean;
    initialValues: IEpicFormTypes;
    validateEpicName: (value: string) => void;
    onSubmitButton: (values: IEpicFormTypes) => void;
}

const EpicModal = (props: IEpicCreationProps) => {
    const classes = useStyles();
    const { isUpdate, validateEpicName, onSubmitButton } = props;

    return (
        <Formik initialValues={EpicInitialState} onSubmit={onSubmitButton}>
            {({ isValid, touched }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;

                return (
                    <div className={classes.root}>
                        <Form>
                            <MainLabel title="Create new epic" variant={LabelType.PRIMARY} />
                            <ModalCloseButtonContainer />
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Name"
                                    name={EpicFields.epicName}
                                    component={FormTextField}
                                    validate={validateEpicName}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Description"
                                    placeholder="Add full and clean description for your epic"
                                    minHeight="93px"
                                    name={EpicFields.epicDescription}
                                    component={FormTextArea}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field label="Start Date" name={EpicFields.startDate} component={FormDatePicker} />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field label="End Date" name={EpicFields.endDate} component={FormDatePicker} />
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button
                                    disabled={!isUpdate && (!isAnyFieldTouched || (isAnyFieldTouched && !isValid))}
                                    type="submit"
                                    label={`${isUpdate ? 'Update' : 'Create'} epic`}
                                />
                            </div>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default EpicModal;
