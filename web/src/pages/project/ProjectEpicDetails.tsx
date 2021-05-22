import { Tab, Tabs } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Update';
import React from 'react';
import Button, { ButtonVariant } from '../../components/common/Button';
import { IEpic } from '../../types/epicTypes';

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
    })
);

export enum TabValues {
    GENERAL_INFO = 'GENERAL_INFO',
    SPRINTS = 'SPRINTS',
}

export interface IProjectEpicDetailsProps {
    selectedTab: string;
    epic: IEpic;
    onChangeTab: (event: React.ChangeEvent<{}>, newValue: string) => void;
}

const ProjectEpicDetails = (props: IProjectEpicDetailsProps) => {
    const classes = useStyles();
    const { selectedTab, epic, onChangeTab } = props;

    return (
        <div className={classes.root}>
            <Tabs
                value={selectedTab}
                classes={{ indicator: classes.indicator }}
                onChange={onChangeTab}
                indicatorColor="primary"
            >
                <Tab classes={{ root: classes.text }} value={TabValues.GENERAL_INFO} label="General Info" />
                <Tab classes={{ root: classes.text }} value={TabValues.SPRINTS} label="Sprints" />
            </Tabs>
            <div className={classes.tabPanelBody}>
                {(() => {
                    switch (selectedTab) {
                        case TabValues.GENERAL_INFO:
                            return <span>{epic.epicName}</span>;
                        case TabValues.SPRINTS:
                            return <span>{epic.epicId}</span>;
                        default:
                            return null;
                    }
                })()}
            </div>
            <div className={classes.tabPanelFooter}>
                <div className={classes.buttonContainer}>
                    <Button
                        startIcon={<UpdateIcon />}
                        label="Update"
                        disabled={false}
                        buttonVariant={ButtonVariant.PRIMARY}
                    />
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        startIcon={<DeleteOutlineIcon />}
                        label="Remove"
                        disabled={false}
                        buttonVariant={ButtonVariant.DANGER}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectEpicDetails;
