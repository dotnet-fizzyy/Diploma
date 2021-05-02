import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { storyFields } from '../../../constants/storyConstants';
import { IStoryFormTypes } from '../../../types/formTypes';
import { ISelectedItem } from '../../../types/storyTypes';
import { IUser } from '../../../types/userTypes';
import Button from '../../common/Button';
import FormDropdown from '../../common/FormDropdown';
import FormTextArea from '../../common/FormTextArea';
import FormTextField from '../../common/FormTextField';
import MainLabel, { LabelType } from '../../common/MainLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '550px',
            maxHeight: '880px',
            width: '100%',
            height: 'max-content',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            overflowY: 'scroll',
        },
        fieldContainer: {
            margin: '20px 0',
        },
        footer: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '200px',
            flexWrap: 'wrap',
            marginTop: '30px',
            justifyContent: 'space-between',
        },
        footerItem: {
            flexBasis: '230px',
            flexShrink: 0,
        },
        buttonContainer: {
            width: '140px',
        },
    })
);

export interface IStoryCreationProps {
    priorities: ISelectedItem[];
    teamMembers: IUser[];
    storyEstimation: ISelectedItem[];
    sprints: ISelectedItem[];
    requiredPositions: ISelectedItem[];
    initialValues: IStoryFormTypes;
    onSubmitStory: (values: IStoryFormTypes) => void;
    validateStoryTitle: (value: string) => void;
}

const StoryModal = (props: IStoryCreationProps) => {
    const classes = useStyles();
    const {
        priorities,
        requiredPositions,
        initialValues,
        sprints,
        storyEstimation,
        teamMembers,
        onSubmitStory,
        validateStoryTitle,
    } = props;

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitStory} enableReinitialize={true}>
            {({ isValid, touched, values }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;

                const usersWithRoles: ISelectedItem[] = teamMembers.reduce(
                    (acc, x) =>
                        x.userPosition === values.requiredPosition
                            ? [...acc, { key: x.userId, value: x.userName } as ISelectedItem]
                            : acc,
                    [{ key: '', value: 'No Owner' } as ISelectedItem]
                );

                return (
                    <div className={classes.root}>
                        <Form>
                            <MainLabel title="Create story" variant={LabelType.PRIMARY} />
                            <div className={classes.fieldContainer}>
                                <Field
                                    component={FormTextField}
                                    name={storyFields.title}
                                    label="Title"
                                    placeholder="Add a title of your task"
                                    validate={validateStoryTitle}
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    component={FormTextArea}
                                    name={storyFields.description}
                                    label="Description"
                                    placeholder="Add full and clear description of your task"
                                    minHeight="115px"
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    component={FormTextArea}
                                    name={storyFields.notes}
                                    label="Notes"
                                    placeholder="Add notes for description your task if it is neccessary"
                                    minHeight="115px"
                                />
                            </div>
                            <div className={classes.fieldContainer}>
                                <Field
                                    component={FormDropdown}
                                    name={storyFields.requiredPosition}
                                    items={requiredPositions}
                                    label="Required position"
                                />
                            </div>
                            <div className={classes.footer}>
                                <div className={classes.footerItem}>
                                    <Field
                                        component={FormDropdown}
                                        name={storyFields.userId}
                                        items={usersWithRoles}
                                        label="Owner"
                                    />
                                </div>
                                <div className={classes.footerItem}>
                                    <Field
                                        component={FormDropdown}
                                        name={storyFields.storyPriority}
                                        items={priorities}
                                        label="Priority"
                                    />
                                </div>
                                <div className={classes.footerItem}>
                                    <Field
                                        component={FormDropdown}
                                        name={storyFields.estimate}
                                        items={storyEstimation}
                                        label="Estimate"
                                    />
                                </div>
                                <div className={classes.footerItem}>
                                    <Field
                                        component={FormDropdown}
                                        name={storyFields.sprintId}
                                        items={sprints}
                                        label="Sprint"
                                    />
                                </div>
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button
                                    disabled={!isAnyFieldTouched || (isAnyFieldTouched && !isValid)}
                                    label=" Create story"
                                    type="submit"
                                />
                            </div>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default StoryModal;