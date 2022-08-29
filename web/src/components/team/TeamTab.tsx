import { createStyles, makeStyles } from '@material-ui/core/styles';
import UpdateIcon from '@material-ui/icons/Update';
import React from 'react';
import { ManagerRoleRequiredMessage } from '../../constants/user';
import Button from '../common/Button';
import Tooltip from '../common/Tooltip';

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

export interface ITeamTabProps {
    isEditingAllowed: boolean;
    onClickUpdateTeam: () => void;
}

const TeamTab = (props: ITeamTabProps) => {
    const classes = useStyles();
    const { isEditingAllowed, onClickUpdateTeam } = props;

    return (
        <div className={classes.root}>
            <div className={classes.tabContainer}>
                <div className={classes.buttonContainer}>
                    <Tooltip message={isEditingAllowed ? '' : ManagerRoleRequiredMessage}>
                        <Button
                            startIcon={<UpdateIcon />}
                            label="Update info"
                            disabled={!isEditingAllowed}
                            onClick={onClickUpdateTeam}
                        />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default TeamTab;
