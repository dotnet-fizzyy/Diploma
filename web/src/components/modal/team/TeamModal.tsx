import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { teamStateFields } from '../../../constants/teamConstants';
import { ISelectedItem } from '../../../types/storyTypes';
import { ITeam } from '../../../types/teamTypes';
import Button from '../../common/Button';
import FormTextField from '../../common/FormTextField';
import MainLabel, { LabelType } from '../../common/MainLabel';
import ModalAdditionalInfo from '../ModalAdditionalInfo';
import ModalSpinner from '../ModalSpinner';
import ModalCloseButtonContainer from '../close-button/ModalCloseButtonContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '550px',
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
        },
        buttonContainer: {
            marginTop: '30px',
            width: '150px',
        },
    })
);

export interface ITeamModalProps {
    isPerformingRequest: boolean;
    isUpdate: boolean;
    projects: ISelectedItem[];
    initialTeam: ITeam;
    validateField: (value: string) => string;
    onSubmit: (values: ITeam) => void;
}

const TeamModal = (props: ITeamModalProps) => {
    const classes = useStyles();
    const { isPerformingRequest, isUpdate, initialTeam, validateField, onSubmit } = props;

    return (
        <Formik initialValues={initialTeam} onSubmit={onSubmit}>
            {({ isValid, touched }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;

                return (
                    <div className={classes.root}>
                        <ModalCloseButtonContainer />
                        {isPerformingRequest && <ModalSpinner />}
                        <Form>
                            <MainLabel
                                title={`${isUpdate ? 'Update' : 'Create new'} team`}
                                variant={LabelType.PRIMARY}
                            />
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Name"
                                    name={teamStateFields.teamName}
                                    component={FormTextField}
                                    validate={validateField}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    label="Location"
                                    name={teamStateFields.location}
                                    component={FormTextField}
                                    validate={validateField}
                                />
                            </div>
                            {!isUpdate && (
                                <div className={classes.fieldContainer}>
                                    <ModalAdditionalInfo />
                                </div>
                            )}
                            <div className={classes.buttonContainer}>
                                <Button
                                    label={`${isUpdate ? 'Update' : 'Create '} team`}
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

export default TeamModal;
