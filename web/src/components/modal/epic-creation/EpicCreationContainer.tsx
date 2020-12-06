import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { epicInitialState } from '../../../constants/epicConstants';
import * as epicActions from '../../../redux/actions/epicActions';
import { IEpic } from '../../../types/epicTypes';
import EpicCreation, { IEpicCreationProps } from './EpicCreation';

const EpicCreationContainer = () => {
    const dispatch = useDispatch();
    const [epic, setEpic] = useState<IEpic>(epicInitialState);

    const onChangeEpicField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setEpic((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const onClickCreateEpic = () => {
        dispatch(epicActions.createEpicRequest(epic));
    };

    const epicCreationProps: IEpicCreationProps = {
        epic,
        onChangeEpicField,
        onClickCreateEpic,
    };

    return <EpicCreation {...epicCreationProps} />;
};

export default EpicCreationContainer;
