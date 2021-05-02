import React from 'react';
import { useDispatch } from 'react-redux';
import { ModalOptions, ModalTypes } from '../../constants/modalConstants';
import { openModal } from '../../redux/actions/modalActions';
import { changeUserActivityStatusRequest } from '../../redux/actions/userActions';
import { ITeam } from '../../types/teamTypes';
import TeamPageDescription, { ITeamPageDescriptionProps } from './TeamPageDescription';

export interface ITeamPageDescriptionContainerProps {
    team: ITeam;
}

const TeamPageDescriptionContainer = (props: ITeamPageDescriptionContainerProps) => {
    const dispatch = useDispatch();
    const { team } = props;

    const onClickAddUser = (): void => {
        dispatch(openModal(ModalTypes.USER_CUSTOMER));
    };

    const onClickUpdateTeam = (): void => {
        dispatch(openModal(ModalTypes.TEAM, ModalOptions.TEAM_UPDATE));
    };

    const onClickChangeStatus = (userId: string, isActive: boolean): void => {
        dispatch(changeUserActivityStatusRequest(userId, isActive));
    };

    const teamPageDescriptionProps: ITeamPageDescriptionProps = {
        team,
        onClickAddUser,
        onClickUpdateTeam,
        onClickChangeStatus,
    };

    return <TeamPageDescription {...teamPageDescriptionProps} />;
};

export default TeamPageDescriptionContainer;
