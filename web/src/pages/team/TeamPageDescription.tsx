import { createStyles, makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import moment from 'moment';
import React from 'react';
import Button from '../../components/common/Button';
import Tooltip from '../../components/common/Tooltip';
import PageHeaderTab from '../../components/header/page-header/PageHeaderTab';
import TeamPersonCard from '../../components/team/TeamPersonCard';
import TeamTab from '../../components/team/TeamTab';
import { DateFormat } from '../../constants';
import { ManagerRoleRequiredMessage, UserPosition, UserRole } from '../../constants/userConstants';
import { ITeam } from '../../types/teamTypes';
import { isUserCustomer, isUserProjectManager } from '../../utils';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
        },
        settingsHeaderPart: {
            flexGrow: 0,
            flexBasis: '180px',
            flexShrink: 0,
            '& button': {
                marginBottom: '10px',
            },
        },
        body: {
            padding: '30px',
        },
        helperButtonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '20px',
        },
        usersContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            minHeight: '500px',
        },
        addPersonButtonContainer: {
            width: '150px',
        },
        cardContainer: {
            margin: '20px 20px 0 0',
        },
    })
);

export interface ITeamPageDescriptionProps {
    currentUserRole: UserRole;
    currentUserPosition: UserPosition;
    team: ITeam;
    onClickAddUser: () => void;
    onClickUpdateTeam: () => void;
    onClickChangeStatus: (userId: string, isActive: boolean) => void;
}

const TeamPageDescription = (props: ITeamPageDescriptionProps) => {
    const classes = useStyles();
    const {
        currentUserRole,
        currentUserPosition,
        team,
        onClickAddUser,
        onClickUpdateTeam,
        onClickChangeStatus,
    } = props;

    const isEditingAllowed: boolean =
        isUserCustomer(currentUserRole, currentUserPosition) ||
        isUserProjectManager(currentUserRole, currentUserPosition);

    return (
        <div className={classes.root}>
            <TeamTab isEditingAllowed={isEditingAllowed} onClickUpdateTeam={onClickUpdateTeam} />
            <div className={classes.body}>
                <PageHeaderTab
                    title={team.teamName}
                    descriptionItems={[
                        { title: 'Location', description: team.location },
                        { title: 'Creation date', description: moment(team.creationDate).format(DateFormat) },
                    ]}
                />
                <div className={classes.helperButtonsContainer}>
                    <div className={classes.addPersonButtonContainer}>
                        <Tooltip message={isEditingAllowed ? '' : ManagerRoleRequiredMessage}>
                            <Button
                                startIcon={<PersonAddIcon />}
                                label="Add person"
                                disabled={!isEditingAllowed}
                                onClick={onClickAddUser}
                            />
                        </Tooltip>
                    </div>
                </div>
                <div className={classes.usersContainer}>
                    {team.users && team.users.length
                        ? team.users.map((x) => (
                              <div key={x.userId} className={classes.cardContainer}>
                                  <TeamPersonCard
                                      user={x}
                                      isEditingAllowed={isEditingAllowed}
                                      onClickChangeStatus={onClickChangeStatus}
                                  />
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
};

export default TeamPageDescription;
