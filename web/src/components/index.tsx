import React, { useRef } from 'react';
import BoardContainer from './board/BoardContainer';
import ModalWindowContainer from './modal/ModalWindowContainer';

const BoardApplication = () => {
    const ref = useRef(null);

    return (
        <div ref={ref}>
            <BoardContainer />
            <ModalWindowContainer modalRef={ref} />
        </div>
    );
};

export default BoardApplication;
