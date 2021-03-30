import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button from '../../components/common/Button';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
        },
        mainContainer: {
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
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

export interface IWorkSpacePageProps {
    onClickCreateWorkSpace: () => void;
}

const WorkSpacePage = (props: IWorkSpacePageProps) => {
    const classes = useStyles();
    const { onClickCreateWorkSpace } = props;

    return (
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <Button label="Create Workspace" disabled={false} onClick={onClickCreateWorkSpace} />
            </div>
        </div>
    );
};

export default WorkSpacePage;
