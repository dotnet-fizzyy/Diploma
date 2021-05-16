import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import UpdateIcon from '@material-ui/icons/Update';
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
            width: '180px',
            marginRight: '20px',
        },
    })
);

export interface IProjectTabProps {
    onClickUpdateProjectInfo: () => void;
    onClickCreateTeamInfo: () => void;
    onClickViewBoard: () => void;
}

const ProjectTab = (props: IProjectTabProps) => {
    const classes = useStyles();
    const { onClickUpdateProjectInfo, onClickCreateTeamInfo, onClickViewBoard } = props;

    return (
        <div className={classes.root}>
            <div className={classes.tabContainer}>
                <div className={classes.buttonContainer}>
                    <Button
                        startIcon={<UpdateIcon />}
                        label="Update info"
                        disabled={false}
                        onClick={onClickUpdateProjectInfo}
                    />
                </div>
                <div className={classes.buttonContainer}>
                    <Button startIcon={<AddIcon />} label="Add team" disabled={false} onClick={onClickCreateTeamInfo} />
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
