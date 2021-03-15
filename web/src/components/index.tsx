import { config } from 'dotenv';
import React from 'react';
import BoardContainer from './board/BoardContainer';

const BoardApplication = () => {
    config();

    return (
        <React.Fragment>
            <BoardContainer />
        </React.Fragment>
    );
};

export default BoardApplication;
