import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MainLabel, { LabelType } from '../../components/common/MainLabel';
import LaunchBackground from '../../components/default/LaunchBackground';
import Background from '../../static/LaunchBackground.png';
import { IStorySimpleModel } from '../../types/storyTypes';
import { ITeamSimpleModel } from '../../types/teamTypes';
import { IUser } from '../../types/userTypes';
import TeamCard from '../project/TeamCard';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '30px',
            boxSizing: 'border-box',
            backgroundColor: '#FAFAFA',
        },
        body: {
            marginTop: '20px',
        },
        teamsContainer: {
            margin: '20px 0',
            display: 'flex',
            flexDirection: 'row',
        },
        teamCardContainer: {
            width: '200px',
            marginRight: '20px',
        },
        launchScreenContainer: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${Background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },
        emptyEntitiesContainer: {
            width: '100%',
            padding: '20px',
            boxSizing: 'border-box',
            backgroundColor: '#FFF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100px',
            border: '1px solid #AFC1C4',
            borderColor: 'rgba(175, 193, 196, 0.2)',
            borderRadius: '5px',
        },
        storiesContainer: {
            marginTop: '20px',
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 500,
            color: '#242126',
        },
    })
);

export interface IMainPageProps {
    user: IUser;
    teams: ITeamSimpleModel[];
    stories: IStorySimpleModel[];
    onSelectTeam: (value: string) => void;
    onSelectProject: (value: string) => void;
    onClickCreateWorkSpace: () => void;
}

const DefaultPage = (props: IMainPageProps) => {
    const classes = useStyles();
    const { user, teams, stories, onClickCreateWorkSpace, onSelectTeam } = props;

    const emptyEntities = (): React.ReactNode => (
        <div className={classes.emptyEntitiesContainer}>
            <span className={classes.text}>There is not content... yet</span>
        </div>
    );

    return user && user.workSpaceId ? (
        <div className={classes.root}>
            <MainLabel title={`Welcome back, ${user.userName}!`} variant={LabelType.PRIMARY} />
            <div className={classes.body}>
                <MainLabel title="My teams" variant={LabelType.SECONDARY} />
                <div className={classes.teamsContainer}>
                    {teams && teams.length
                        ? teams.map((x) => (
                              <div key={x.teamId} className={classes.teamCardContainer}>
                                  <TeamCard team={x} onClickViewTeam={onSelectTeam} />
                              </div>
                          ))
                        : emptyEntities()}
                </div>
                <MainLabel title="My last stories" variant={LabelType.SECONDARY} />
                <div className={classes.storiesContainer}>
                    {stories && stories.length
                        ? stories.map((x) => <div key={x.storyId}>{x.title}</div>)
                        : emptyEntities()}
                </div>
            </div>
        </div>
    ) : (
        <div className={classes.launchScreenContainer}>
            <LaunchBackground onClickCreateWorkSpace={onClickCreateWorkSpace} />
        </div>
    );
};

export default DefaultPage;
