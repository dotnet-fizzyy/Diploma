import { createStyles, makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import HistoryIcon from '@material-ui/icons/History';
import classnames from 'classnames';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { storyFields } from '../../../constants/storyConstants';
import { UserPosition } from '../../../constants/userConstants';
import { IStoryFormTypes } from '../../../types/formTypes';
import { ISelectedItem } from '../../../types/storyTypes';
import { IUser } from '../../../types/userTypes';
import { areStoriesEqual } from '../../../utils/storyHelper';
import { createAvailableUsersDropdownItems } from '../../../utils/userHelper';
import Button, { ButtonVariant } from '../../common/Button';
import FormDropdown from '../../common/FormDropdown';
import FormTextArea from '../../common/FormTextArea';
import FormTextField from '../../common/FormTextField';
import StoryConfirmChanges from './StoryConfirmChanges';
import StoryStatus from './StoryStatus';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
        },
        isModalVisible: {
            paddingBottom: '120px',
        },
        sectionContainer: {
            marginTop: '20px',
        },
        buttonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            '& button': {
                width: 'max-content',
                marginRight: '10px',
            },
        },
        icon: {
            fontSize: '18px',
            marginRight: '3px',
        },
    })
);

export interface ISidebarStoryDescription {
    isReady: boolean;
    isBlocked: boolean;
    isLoading: boolean;
    users: IUser[];
    sprints: ISelectedItem[];
    storyPriorities: ISelectedItem[];
    requiredPositions: ISelectedItem[];
    storyEstimates: ISelectedItem[];
    initialValues: IStoryFormTypes;
    onSetStoryBlocked: () => void;
    onSetStoryReady: () => void;
    onClickCancelChanges: () => void;
    onClickRemoveStory: () => void;
    onClickViewStoryHistory: () => void;
    onSubmitChanges: (values: IStoryFormTypes) => void;
    validateStoryTitle: (value: string) => void;
}

const SidebarStoryDescription = (props: ISidebarStoryDescription) => {
    const classes = useStyles();
    const {
        isReady,
        isBlocked,
        initialValues,
        users,
        storyEstimates,
        sprints,
        requiredPositions,
        storyPriorities,
        onSetStoryReady,
        onSetStoryBlocked,
        onClickCancelChanges,
        onClickRemoveStory,
        onClickViewStoryHistory,
        onSubmitChanges,
        validateStoryTitle,
    } = props;

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitChanges} enableReinitialize={true}>
            {({ isValid, values, initialValues, resetForm }) => {
                const storiesEquality =
                    areStoriesEqual(initialValues, values) &&
                    initialValues.isBlocked === isBlocked &&
                    initialValues.isReady === isReady;

                const onClickResetValues = () => {
                    resetForm();
                    onClickCancelChanges();
                };

                const usersWithRoles: ISelectedItem[] = createAvailableUsersDropdownItems(
                    UserPosition[values.requiredPosition],
                    users
                );

                if (!usersWithRoles.some((x) => x.key === values.userId)) {
                    values.userId = '';
                }

                return (
                    <div className={classes.root}>
                        <Form>
                            <div className={classes.buttonsContainer}>
                                <Button
                                    startIcon={<HistoryIcon className={classes.icon} />}
                                    disabled={false}
                                    label="View History"
                                    isSmall={true}
                                    onClick={onClickViewStoryHistory}
                                />
                                <Button
                                    startIcon={<DeleteOutlineIcon className={classes.icon} />}
                                    disabled={false}
                                    label="Remove story"
                                    isSmall={true}
                                    buttonVariant={ButtonVariant.DANGER}
                                    onClick={onClickRemoveStory}
                                />
                            </div>
                            <div
                                className={classnames({
                                    [classes.isModalVisible]: !storiesEquality,
                                })}
                            >
                                <div className={classes.sectionContainer}>
                                    <Field
                                        name={storyFields.title}
                                        label="Story name"
                                        component={FormTextField}
                                        validate={validateStoryTitle}
                                    />
                                </div>
                                <div className={classes.sectionContainer}>
                                    <StoryStatus
                                        isBlocked={isBlocked}
                                        isReady={isReady}
                                        onSetStoryReady={onSetStoryReady}
                                        onSetStoryBlocked={onSetStoryBlocked}
                                    />
                                </div>
                                <div className={classes.sectionContainer}>
                                    <Field
                                        name={storyFields.requiredPosition}
                                        disabled={false}
                                        label="Required Position"
                                        items={requiredPositions}
                                        component={FormDropdown}
                                    />
                                </div>
                                <div className={classes.sectionContainer}>
                                    <Field
                                        name={storyFields.userId}
                                        disabled={false}
                                        label="Story Owner"
                                        items={usersWithRoles}
                                        component={FormDropdown}
                                    />
                                </div>
                                <div className={classes.sectionContainer}>
                                    <Field
                                        name={storyFields.storyPriority}
                                        disabled={false}
                                        label="Priority"
                                        items={storyPriorities}
                                        component={FormDropdown}
                                    />
                                </div>
                                <div className={classes.sectionContainer}>
                                    <Field
                                        name={storyFields.sprintId}
                                        disabled={false}
                                        label="Sprint"
                                        items={sprints}
                                        component={FormDropdown}
                                    />
                                </div>
                                <div className={classes.sectionContainer}>
                                    <Field
                                        name={storyFields.estimate}
                                        disabled={false}
                                        label="Estimate"
                                        items={storyEstimates}
                                        component={FormDropdown}
                                    />
                                </div>

                                <div className={classes.sectionContainer}>
                                    <Field
                                        name={storyFields.description}
                                        label="Description"
                                        component={FormTextArea}
                                        minHeight="130px"
                                    />
                                </div>

                                <div className={classes.sectionContainer}>
                                    <Field
                                        name={storyFields.notes}
                                        label="Notes"
                                        component={FormTextArea}
                                        minHeight="130px"
                                    />
                                </div>
                            </div>
                            {!storiesEquality && (
                                <StoryConfirmChanges disabled={!isValid} onClickCancelChanges={onClickResetValues} />
                            )}
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default React.memo(SidebarStoryDescription);
