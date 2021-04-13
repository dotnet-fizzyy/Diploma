import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/actions/modalActions';
import { ModalOptions, ModalTypes } from '../../types/modalTypes';
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

    const teamPageDescriptionProps: ITeamPageDescriptionProps = {
        team,
        onClickAddUser,
        onClickUpdateTeam,
    };

    return <TeamPageDescription {...teamPageDescriptionProps} />;
};

export default TeamPageDescriptionContainer;
