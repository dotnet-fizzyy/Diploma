import React from 'react';
import { useSelector } from 'react-redux';
import * as currentUserSelectors from '../../redux/selectors/userSelectors';
import CustomRouter, { ICustomRouterProps } from './CustomRouter';

const CustomRouterContainer = () => {
    const user = useSelector(currentUserSelectors.getUser);

    const customRouterProps: ICustomRouterProps = {
        isLogged: !!(user && user.userId),
    };

    return user && <CustomRouter {...customRouterProps} />;
};

export default CustomRouterContainer;
