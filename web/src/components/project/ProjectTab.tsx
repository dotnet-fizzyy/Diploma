import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import UpdateIcon from '@material-ui/icons/Update';
import classnames from 'classnames';
import React from 'react';
import Button from '../common/Button';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            minWidth: '100%',
            height: '70px',
            backgroundColor: '#FFF',
        },
        tabContainer: {
            padding: '0 30px',
            height: 'inherit',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonContainer: {
            width: '150px',
            marginRight: '20px',
        },
        projectUpdateButton: {
            width: '220px',
        },
    })
);

export interface IProjectTabProps {
    onClickUpdateProjectInfo: () => void;
    onClickCreateTeamInfo: () => void;
    onClickViewBoard: () => void;
    onClickCreateEpic: () => void;
}

const ProjectTab = (props: IProjectTabProps) => {
    const classes = useStyles();
    const { onClickUpdateProjectInfo, onClickCreateTeamInfo, onClickViewBoard, onClickCreateEpic } = props;

    return (
        <div className={classes.root}>
            <div className={classes.tabContainer}>
                <div className={classnames(classes.buttonContainer, classes.projectUpdateButton)}>
                    <Button
                        startIcon={<UpdateIcon />}
                        label="Update description"
                        disabled={false}
                        onClick={onClickUpdateProjectInfo}
                    />
                </div>
                <div className={classes.buttonContainer}>
                    <Button startIcon={<AddIcon />} label="Add team" disabled={false} onClick={onClickCreateTeamInfo} />
                </div>
                <div className={classes.buttonContainer}>
                    <Button startIcon={<AddIcon />} label="Add epic" disabled={false} onClick={onClickCreateEpic} />
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        startIcon={<DashboardIcon />}
                        label="View board"
                        disabled={false}
                        onClick={onClickViewBoard}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectTab;
