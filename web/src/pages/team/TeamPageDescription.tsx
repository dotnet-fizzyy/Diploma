import { createStyles, makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React from 'react';
import Button from '../../components/common/Button';
import PageHeaderTab from '../../components/header/page-header/PageHeaderTab';
import TeamPersonCard from '../../components/team/TeamPersonCard';
import { mockedUser } from '../../mock/mockedUser';
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
            marginTop: '50px',
        },
        helperButtonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '20px',
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
            <PageHeaderTab
                title={team.teamName}
                descriptionItems={[{ title: 'Location', description: team.location }]}
                creationDate={team.creationDate}
                options={
                    <div className={classes.settingsHeaderPart}>
                        <Button label="Update info" disabled={false} onClick={onClickUpdateTeam} />
                    </div>
                }
            />
            <div className={classes.body}>
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
                    <TeamPersonCard user={mockedUser} onClickChangeStatus={onClickChangeStatus} />
                </div>
            </div>
        </div>
    );
};

export default TeamPageDescription;
