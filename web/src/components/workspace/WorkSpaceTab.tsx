import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
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

export interface IWorkSpaceTabProps {
    onClickUpdateWorkSpaceInfo: () => void;
    onClickCreateProject: () => void;
}

const WorkSpaceTab = (props: IWorkSpaceTabProps) => {
    const classes = useStyles();
    const { onClickCreateProject, onClickUpdateWorkSpaceInfo } = props;

    return (
        <div className={classes.root}>
            <div className={classes.tabContainer}>
                <div className={classes.buttonContainer}>
                    <Button
                        startIcon={<UpdateIcon />}
                        label="Update info"
                        disabled={false}
                        onClick={onClickUpdateWorkSpaceInfo}
                    />
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        startIcon={<AddIcon />}
                        label="Create project"
                        disabled={false}
                        onClick={onClickCreateProject}
                    />
                </div>
            </div>
        </div>
    );
};

export default WorkSpaceTab;
