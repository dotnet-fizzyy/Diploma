import { config } from 'dotenv';
import React from 'react';
import BoardContainer from './board/BoardContainer';

const BoardApplication = () => {
    config();

    return (
        <div>
            <BoardContainer />
        </div>
    );
};

export default BoardApplication;
