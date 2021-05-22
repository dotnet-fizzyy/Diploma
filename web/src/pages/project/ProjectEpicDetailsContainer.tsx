import React, { useState } from 'react';
import { IEpic } from '../../types/epicTypes';
import ProjectEpicDetails, { TabValues } from './ProjectEpicDetails';

export interface IProjectEpicDetailsContainerProps {
    epic: IEpic;
}

const ProjectEpicDetailsContainer = (props: IProjectEpicDetailsContainerProps) => {
    const { epic } = props;

    const [selectedTab, setSelectedTab] = useState<string>(TabValues.GENERAL_INFO);

    const onChangeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTab(newValue);
    };

    return <ProjectEpicDetails selectedTab={selectedTab} onChangeTab={onChangeTab} epic={epic} />;
};

export default ProjectEpicDetailsContainer;
