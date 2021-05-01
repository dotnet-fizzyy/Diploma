import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import HistoryIcon from '@material-ui/icons/History';
import classnames from 'classnames';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { storyFields } from '../../constants/storyConstants';
import { IStoryFormTypes } from '../../types/formTypes';
import { ISelectedItem } from '../../types/storyTypes';
import { areStoriesEqual } from '../../utils/storyHelper';
import Button, { ButtonVariant } from '../common/Button';
import FormDropdown from '../common/FormDropdown';
import FormTextArea from '../common/FormTextArea';
import FormTextField from '../common/FormTextField';
import StoryConfirmChanges from './story-description/StoryConfirmChanges';
import StoryStatus from './story-description/StoryStatus';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            minWidth: '450px',
            width: '100%',
            minHeight: '100%',
            position: 'relative',
        },
        closeSidebarIcon: {
            position: 'absolute',
            fontSize: '30px',
            top: '0.5%',
            right: '0.5%',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        body: {
            padding: '0 20px 20px 20px',
        },
        isModalVisible: {
            paddingBottom: '120px',
        },
        sectionContainer: {
            marginTop: '20px',
        },
        spinnerContainer: {
            position: 'absolute',
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 5,
        },
        buttonsContainer: {
            margin: '20px 0 0 20px',
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

export interface ISidebarProps {
    isReady: boolean;
    isBlocked: boolean;
    team: ISelectedItem[];
    sprints: ISelectedItem[];
    storyPriorities: ISelectedItem[];
    storyEstimates: ISelectedItem[];
    initialValues: IStoryFormTypes;
    onCloseTab: () => void;
    onSetStoryBlocked: () => void;
    onSetStoryReady: () => void;
    onClickCancelChanges: () => void;
    onClickRemoveStory: () => void;
    onClickViewStoryHistory: () => void;
    onSubmitChanges: (values: IStoryFormTypes) => void;
}

const Sidebar = (props: ISidebarProps) => {
    const classes = useStyles();
    const {
        isReady,
        isBlocked,
        initialValues,
        team,
        storyEstimates,
        sprints,
        storyPriorities,
        onCloseTab,
        onSetStoryReady,
        onSetStoryBlocked,
        onClickCancelChanges,
        onClickRemoveStory,
        onClickViewStoryHistory,
        onSubmitChanges,
    } = props;

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitChanges}>
            {({ touched, values, initialValues, resetForm }) => {
                const isAnyFieldTouched: boolean = !!Object.keys(touched).length;
                const storiesEquality =
                    areStoriesEqual(initialValues, values) &&
                    initialValues.isBlocked === isBlocked &&
                    initialValues.isReady === isReady;
                console.log(isAnyFieldTouched);

                const onClickResetValues = () => {
                    resetForm();
                    onClickCancelChanges();
                };

                return (
                    <div className={classes.root}>
                        <Form>
                            {false && (
                                <div className={classes.spinnerContainer}>
                                    <CircularProgress color="primary" />
                                </div>
                            )}
                            <CloseIcon className={classes.closeSidebarIcon} onClick={onCloseTab} />
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
                                className={classnames(classes.body, {
                                    [classes.isModalVisible]: !storiesEquality,
                                })}
                            >
                                <div className={classes.sectionContainer}>
                                    <Field name={storyFields.title} label="Story name" component={FormTextField} />
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
                                        name={storyFields.userId}
                                        disabled={false}
                                        label="Story Owner"
                                        items={team}
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
                            {!storiesEquality && <StoryConfirmChanges onClickCancelChanges={onClickResetValues} />}
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default React.memo(Sidebar);
