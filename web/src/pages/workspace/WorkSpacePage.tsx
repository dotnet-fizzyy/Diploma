import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button from '../../components/common/Button';
import { IUserListItem } from '../../types/userTypes';
import { IWorkSpace } from '../../types/workSpaceTypes';
import WorkSpacePageDescription from './WorkSpacePageDescription';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
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
    customersList: IUserListItem[];
    workSpace: IWorkSpace;
    isLoading: boolean;
    onClickCreateWorkSpace: () => void;
    onClickUpdateWorkSpaceInfo: () => void;
    onClickCreateCustomer: () => void;
}

const WorkSpacePage = (props: IWorkSpacePageProps) => {
    const classes = useStyles();
    const {
        isLoading,
        workSpace,
        customersList,
        onClickCreateWorkSpace,
        onClickUpdateWorkSpaceInfo,
        onClickCreateCustomer,
    } = props;

    return (
        <div className={classes.root}>
            {!isLoading && !workSpace.workSpaceId && (
                <Button label="Create Workspace" disabled={false} onClick={onClickCreateWorkSpace} />
            )}
            {!isLoading && workSpace && workSpace.workSpaceId && (
                <WorkSpacePageDescription
                    customersList={customersList}
                    workSpace={workSpace}
                    onClickUpdateWorkSpaceInfo={onClickUpdateWorkSpaceInfo}
                    onClickCreateCustomer={onClickCreateCustomer}
                />
            )}
        </div>
    );
};

export default WorkSpacePage;
