import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserTeamPageRequest } from '../../redux/actions/teamActions';
import { getSelectedTeam } from '../../redux/selectors/teamSelectors';
import { ITeam } from '../../types/teamTypes';
import TeamPage, { ITeamPageProps } from './TeamPage';

const TeamPageContainer = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const team: ITeam = useSelector(getSelectedTeam);

    useEffect(() => {
        if (params && 'teamId' in params) {
            dispatch(getUserTeamPageRequest((params as any).teamId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const teamPageProps: ITeamPageProps = {
        team,
    };

    return <TeamPage {...teamPageProps} />;
};

export default TeamPageContainer;
