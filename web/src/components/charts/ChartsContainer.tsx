import React from 'react';
import { useSelector } from 'react-redux';
import * as epicsSelectors from '../../redux/selectors/epicsSelectors';
import * as sprintSelectors from '../../redux/selectors/sprintsSelectors';
import * as storiesSelectors from '../../redux/selectors/storiesSelectors';
import Charts, { IChartsProps } from './Charts';

const ChartsContainer = () => {
    const sprints = useSelector(sprintSelectors.getSprints);
    const epic = useSelector(epicsSelectors.getCurrentEpic);
    const stories = useSelector(storiesSelectors.getAllStories);

    const chartsProps: IChartsProps = {
        sprints,
        epic,
        stories,
    };

    return <Charts {...chartsProps} />;
};

export default ChartsContainer;
