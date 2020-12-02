import { Drawer } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { ISelectedItem } from '../../types/storyTypes';
import ColumnContainer from '../column/ColumnContainer';
import InfoTabContainer from '../header/board-info-tab/InfoTabContainer';
import SidebarContainer from '../sidebar/SidebarContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            minWidth: '100vh',
            minHeight: '100vh',
        },
        body: {
            backgroundColor: '#FAFAFA',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            minHeight: '100%',
        },
    })
);

export interface IBoardProps {
    columns: ISelectedItem[];
    isSidebarVisible: boolean;
    onDragEnd: (result: any) => void;
    onCloseSidebar: () => void;
}

const Board = (props: IBoardProps) => {
    const classes = useStyles();
    const { columns, isSidebarVisible, onDragEnd, onCloseSidebar } = props;

    return (
        <div className={classes.root}>
            <InfoTabContainer />
            <div className={classes.body}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {columns.map((column) => (
                        <React.Fragment key={column.key}>
                            <ColumnContainer column={column} />
                        </React.Fragment>
                    ))}
                </DragDropContext>
            </div>
            <div>
                <Drawer open={isSidebarVisible} anchor="right" variant="temporary" onClose={onCloseSidebar}>
                    <SidebarContainer />
                </Drawer>
            </div>
        </div>
    );
};

export default Board;
