import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalOptions, ModalTypes } from '../../constants/modalConstants';
import { openModal } from '../../redux/actions/modal';
import { changeUserActivityStatusRequest } from '../../redux/actions/user';
import { getUser } from '../../redux/selectors/userSelectors';
import { ITeam } from '../../types/teamTypes';
import { IFullUser } from '../../types/userTypes';
import TeamPageDescription, { ITeamPageDescriptionProps } from './TeamPageDescription';

export interface ITeamPageDescriptionContainerProps {
    team: ITeam;
}

const TeamPageDescriptionContainer = (props: ITeamPageDescriptionContainerProps) => {
    const dispatch = useDispatch();
    const { team } = props;

    const currentUser: IFullUser = useSelector(getUser);

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
        currentUserRole: currentUser.userRole,
        currentUserPosition: currentUser.userPosition,
        team,
        onClickAddUser,
        onClickUpdateTeam,
        onClickChangeStatus,
    };

    return <TeamPageDescription {...teamPageDescriptionProps} />;
};

export default TeamPageDescriptionContainer;
