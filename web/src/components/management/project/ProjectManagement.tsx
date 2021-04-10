import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { IEpic } from '../../../types/epicTypes';
import { ISprint } from '../../../types/sprintTypes';
import PageHeaderTab from '../../header/page-header/PageHeaderTab';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            backgroundColor: '#FAFAFA',
            padding: '30px',
        },
        mainContainer: {
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
        },
        infoPartContainer: {
            flexGrow: 1,
            flexBasis: 0,
            overflowY: 'scroll',
            height: '100%',
        },
        header: {
            marginTop: '20px',
            fontSize: '26px',
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
        },
        teamLink: {
            fontSize: '18px',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
                cursor: 'pointer',
            },
            height: '50px',
            display: 'flex',
            alignItems: 'center',
        },
        epicName: {
            width: '100%',
            maxWidth: '400px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
        },
        button: {
            backgroundColor: '#75BAF7',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            width: '145px',
            height: '45px',
            fontSize: '16px',
            textTransform: 'capitalize',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
                border: '1px solid lightgrey',
                backgroundColor: '#E8F4FF',
                color: '#75BAF7',
                boxShadow: 'none',
            },
        },
        manageButton: {
            height: 'auto',
            marginRight: '20px',
        },
        collectionItem: {
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
        },
        itemButton: {
            marginLeft: '20px',
            height: '40px',
        },
        dates: {
            fontSize: '16px',
            color: '#AFC1C4',
        },
        emptyResults: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '20px',
            marginTop: '30px',
        },
    })
);

export interface IProjectManagementProps {
    epics: IEpic[];
    sprints: ISprint[];
    selectedEpic: string;
    onClickCreateEpic: () => void;
    onClickCreateSprint: () => void;
    onSelectViewEpicSprints: (epicId: string) => void;
}

const ProjectManagement = (props: IProjectManagementProps) => {
    const classes = useStyles();
    const { epics, sprints, selectedEpic, onClickCreateEpic, onClickCreateSprint, onSelectViewEpicSprints } = props;

    const renderEpics = (epic: IEpic): React.ReactNode => (
        <div className={classes.collectionItem}>
            <span className={classes.epicName}>
                {epic.epicName} |&nbsp;
                <span className={classes.dates}>
                    &nbsp;{moment(epic.startDate).format('yyyy-MM-DD')} - {moment(epic.endDate).format('yyyy-MM-DD')}
                </span>
            </span>
            <Button
                onClick={() => onSelectViewEpicSprints(epic.epicId)}
                className={classnames(classes.button, classes.itemButton)}
            >
                View sprints
            </Button>
        </div>
    );

    const renderSprints = (sprint: ISprint): React.ReactNode => (
        <div className={classes.collectionItem} style={{ height: '40px' }}>
            <span className={classes.epicName}>
                {sprint.sprintName} |&nbsp;
                <span className={classes.dates}>
                    &nbsp;{moment(sprint.startDate).format('yyyy-MM-DD')} -{' '}
                    {moment(sprint.endDate).format('yyyy-MM-DD')}
                </span>
            </span>
        </div>
    );

    return (
        <div className={classes.root}>
            <PageHeaderTab title="Test" description="TestDesc" creationDate={new Date()} onClickUpdateInfo={null} />
            <div className={classes.mainContainer}>
                <div className={classes.infoPartContainer}>
                    <span className={classes.header}>Epics</span>
                    <div className={classes.body}>
                        <Button
                            onClick={onClickCreateEpic}
                            className={classes.button}
                            variant="outlined"
                            startIcon={<AddIcon />}
                        >
                            Add Epic
                        </Button>
                        {epics && epics.length ? (
                            epics.map((epic) => <React.Fragment key={epic.epicId}>{renderEpics(epic)}</React.Fragment>)
                        ) : (
                            <div className={classes.emptyResults}>No epics created... yet</div>
                        )}
                    </div>
                </div>
                <div className={classes.infoPartContainer}>
                    <span className={classes.header}>Sprints</span>
                    <div className={classes.body}>
                        {selectedEpic ? (
                            <>
                                <Button
                                    onClick={onClickCreateSprint}
                                    className={classes.button}
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                >
                                    Add Sprint
                                </Button>
                                {sprints.length ? (
                                    sprints.map((x) => (
                                        <React.Fragment key={x.sprintId}>{renderSprints(x)}</React.Fragment>
                                    ))
                                ) : (
                                    <div className={classes.emptyResults}>No sprints created... yet</div>
                                )}
                            </>
                        ) : (
                            <div className={classes.emptyResults}>Please, select epic first</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectManagement;
