import { config } from 'dotenv';
import React, { useRef } from 'react';
import BoardContainer from './board/BoardContainer';
import ModalWindowContainer from './modal/ModalWindowContainer';

const BoardApplication = () => {
    const ref = useRef(null);
    config();

    return (
        <div ref={ref}>
            <BoardContainer />
            <ModalWindowContainer modalRef={ref} />
        </div>
    );
};

export default BoardApplication;
