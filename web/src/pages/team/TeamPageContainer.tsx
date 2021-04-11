import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserTeamPageRequest } from '../../redux/actions/teamActions';
import TeamPage from './TeamPage';

const TeamPageContainer = () => {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        debugger;
        if (params && 'teamId' in params) {
            dispatch(getUserTeamPageRequest((params as any).teamId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <TeamPage />;
};

export default TeamPageContainer;
