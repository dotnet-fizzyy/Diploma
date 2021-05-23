import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ModalOptions, ModalTypes } from '../../constants/modalConstants';
import { openModal } from '../../redux/actions/modalActions';
import { setSelectedSprint } from '../../redux/actions/sprintActions';
import { IEpic } from '../../types/epicTypes';
import { ISprint } from '../../types/sprintTypes';
import ProjectEpicDetails, { TabValues } from './ProjectEpicDetails';

export interface IProjectEpicDetailsContainerProps {
    sprints: ISprint[];
    epic: IEpic;
    onClickCreateSprint: () => void;
}

const ProjectEpicDetailsContainer = (props: IProjectEpicDetailsContainerProps) => {
    const dispatch = useDispatch();
    const { epic, sprints, onClickCreateSprint } = props;

    const [selectedTab, setSelectedTab] = useState<string>(TabValues.GENERAL_INFO);

    const onChangeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTab(newValue);
    };

    const onClickUpdateEpic = (): void => {
        dispatch(openModal(ModalTypes.EPIC, ModalOptions.EPIC_UPDATE));
    };

    const onClickRemoveEpic = (): void => {};

    const onClickUpdateSprint = (sprintId: string): void => {
        dispatch(setSelectedSprint(sprintId));
        dispatch(openModal(ModalTypes.SPRINT, ModalOptions.SPRINT_UPDATE));
    };

    const onClickRemoveSprint = (sprintId: string): void => {};

    return (
        <ProjectEpicDetails
            selectedTab={selectedTab}
            onChangeTab={onChangeTab}
            epic={epic}
            sprints={sprints}
            onClickUpdateEpic={onClickUpdateEpic}
            onClickRemoveEpic={onClickRemoveEpic}
            onClickCreateSprint={onClickCreateSprint}
            onClickUpdateSprint={onClickUpdateSprint}
            onClickRemoveSprint={onClickRemoveSprint}
        />
    );
};

export default ProjectEpicDetailsContainer;
