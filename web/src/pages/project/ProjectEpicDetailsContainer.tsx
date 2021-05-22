import React, { useState } from 'react';
import { IEpic } from '../../types/epicTypes';
import { ISprint } from '../../types/sprintTypes';
import ProjectEpicDetails, { TabValues } from './ProjectEpicDetails';

export interface IProjectEpicDetailsContainerProps {
    sprints: ISprint[];
    epic: IEpic;
    onClickCreateSprint: () => void;
}

const ProjectEpicDetailsContainer = (props: IProjectEpicDetailsContainerProps) => {
    const { epic, sprints, onClickCreateSprint } = props;

    const [selectedTab, setSelectedTab] = useState<string>(TabValues.GENERAL_INFO);

    const onChangeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTab(newValue);
    };

    return (
        <ProjectEpicDetails
            selectedTab={selectedTab}
            onChangeTab={onChangeTab}
            epic={epic}
            sprints={sprints}
            onClickCreateSprint={onClickCreateSprint}
        />
    );
};

export default ProjectEpicDetailsContainer;