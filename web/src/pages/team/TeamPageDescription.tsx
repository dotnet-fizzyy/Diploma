import { createStyles, makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import Button from '../../components/common/Button';
import PageHeaderTab from '../../components/header/page-header/PageHeaderTab';
import TeamPersonCard from '../../components/team/TeamPersonCard';
import TeamTab from '../../components/team/TeamTab';
import { ITeam } from '../../types/teamTypes';

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
            margin: '20px 0',
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
    })
);

export interface ITeamPageDescriptionProps {
    team: ITeam;
    onClickAddUser: () => void;
    onClickUpdateTeam: () => void;
    onClickChangeStatus: (userId: string, isActive: boolean) => void;
}

const TeamPageDescription = (props: ITeamPageDescriptionProps) => {
    const classes = useStyles();
    const { team, onClickAddUser, onClickUpdateTeam, onClickChangeStatus } = props;

    return (
        <div className={classes.root}>
            <TeamTab onClickUpdateTeam={onClickUpdateTeam} />
            <div className={classes.body}>
                <PageHeaderTab
                    title={team.teamName}
                    descriptionItems={[{ title: 'Location', description: team.location }]}
                    creationDate={team.creationDate}
                />
                <div className={classes.helperButtonsContainer}>
                    <div className={classes.addPersonButtonContainer}>
                        <Button
                            startIcon={<PersonAddIcon />}
                            label="Add person"
                            disabled={false}
                            onClick={onClickAddUser}
                        />
                    </div>
                </div>
                <div className={classes.usersContainer}>
                    {team.users && team.users.length
                        ? team.users.map((x) => (
                              <TeamPersonCard key={x.userId} user={x} onClickChangeStatus={onClickChangeStatus} />
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
};

export default TeamPageDescription;
