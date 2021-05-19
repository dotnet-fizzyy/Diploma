import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProjectStatsPageRequest } from '../../redux/actions/projectActions';
import { validateGuid } from '../../utils';
import { getQueryParameter } from '../../utils/routeUtils';
import StatsPage from './StatsPage';

const StatsPageContainer = () => {
    const dispatch = useDispatch();
    const location: any = useLocation();

    useEffect(() => {
        const projectId: string = getQueryParameter(location.search, 'projectId');

        if (!validateGuid(projectId)) {
            return;
        }

        dispatch(getProjectStatsPageRequest(projectId));
        // eslint-disable-next-line
    }, []);

    return <StatsPage />;
};

export default StatsPageContainer;
