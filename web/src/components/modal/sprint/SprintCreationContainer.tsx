import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { initialSprintState } from '../../../constants/sprintConstants';
import * as sprintActions from '../../../redux/actions/sprintsActions';
import { ISprint } from '../../../types/sprintTypes';
import SprintCreation, { ISprintCreationProps } from './SprintCreation';

const SprintCreationContainer = () => {
    const dispatch = useDispatch();
    const [sprint, setSprint] = useState<ISprint>(initialSprintState);

    const onChangeSprintField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setSprint((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const onClickSprintCreate = () => {
        dispatch(sprintActions.createSprintRequest(sprint));
    };

    const sprintCreationProps: ISprintCreationProps = {
        sprint,
        onChangeSprintField,
        onClickSprintCreate,
    };

    return <SprintCreation {...sprintCreationProps} />;
};

export default SprintCreationContainer;
