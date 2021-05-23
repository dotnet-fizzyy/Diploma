import { Tab, Tabs } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Update';
import classnames from 'classnames';
import React from 'react';
import Button, { ButtonVariant } from '../../components/common/Button';
import { IEpic } from '../../types/epicTypes';
import { ISprint } from '../../types/sprintTypes';
import EpicsTab from './EpicsTab';
import SprintsTab from './SprintsTab';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        text: {
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '16px',
            color: '#242126',
        },
        descriptionText: {
            fontWeight: 400,
            color: '#AFC1C4',
        },
        tabPanelBody: {
            marginTop: '20px',
        },
        tabPanelFooter: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        indicator: {
            backgroundColor: '#75BAF7',
            height: '3px',
        },
        buttonContainer: {
            width: '150px',
            marginLeft: '20px',
        },
        tab: {
            width: '140px',
            minWidth: '140px',
        },
    })
);

export enum TabValues {
    GENERAL_INFO = 'GENERAL_INFO',
    SPRINTS = 'SPRINTS',
}

export interface IProjectEpicDetailsProps {
    sprints: ISprint[];
    selectedTab: string;
    epic: IEpic;
    onChangeTab: (event: React.ChangeEvent<{}>, newValue: string) => void;
    onClickCreateSprint: () => void;
    onClickUpdateEpic: () => void;
    onClickRemoveEpic: () => void;
    onClickUpdateSprint: (sprintId: string) => void;
    onClickRemoveSprint: (sprintId: string) => void;
}

const ProjectEpicDetails = (props: IProjectEpicDetailsProps) => {
    const classes = useStyles();
    const {
        selectedTab,
        epic,
        sprints,
        onChangeTab,
        onClickUpdateEpic,
        onClickRemoveEpic,
        onClickCreateSprint,
        onClickUpdateSprint,
        onClickRemoveSprint,
    } = props;

    return (
        <div className={classes.root}>
            <Tabs
                value={selectedTab}
                classes={{ indicator: classes.indicator }}
                onChange={onChangeTab}
                indicatorColor="primary"
            >
                <Tab
                    disableTouchRipple={true}
                    classes={{ root: classnames(classes.text, classes.tab) }}
                    value={TabValues.GENERAL_INFO}
                    label="General Info"
                />
                <Tab
                    disableTouchRipple={true}
                    classes={{ root: classnames(classes.text, classes.tab) }}
                    value={TabValues.SPRINTS}
                    label="Sprints"
                />
            </Tabs>
            <div className={classes.tabPanelBody}>
                {(() => {
                    switch (selectedTab) {
                        case TabValues.GENERAL_INFO:
                            return <EpicsTab epic={epic} />;
                        case TabValues.SPRINTS:
                            return (
                                <SprintsTab
                                    sprints={sprints}
                                    onClickUpdateSprint={onClickUpdateSprint}
                                    onClickRemoveSprint={onClickRemoveSprint}
                                />
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
            <div className={classes.tabPanelFooter}>
                <div className={classes.buttonContainer}>
                    <Button
                        startIcon={<AddIcon />}
                        label="Add Sprint"
                        disabled={false}
                        buttonVariant={ButtonVariant.PRIMARY}
                        onClick={onClickCreateSprint}
                    />
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        startIcon={<UpdateIcon />}
                        label="Update"
                        disabled={false}
                        buttonVariant={ButtonVariant.PRIMARY}
                        onClick={onClickUpdateEpic}
                    />
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        startIcon={<DeleteOutlineIcon />}
                        label="Remove"
                        disabled={false}
                        buttonVariant={ButtonVariant.DANGER}
                        onClick={onClickRemoveEpic}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectEpicDetails;
