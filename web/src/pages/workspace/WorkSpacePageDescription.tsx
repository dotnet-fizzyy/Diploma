import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import CustomersList from '../../components/workspace/CustomersList';
import WorkSpaceHeader from '../../components/workspace/WorkSpaceHeader';
import { IUserListItem } from '../../types/userTypes';
import { IWorkSpace } from '../../types/workSpaceTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            backgroundColor: '#FAFAFA',
        },
        body: {
            padding: '30px',
        },
    })
);

export interface IWorkSpacePageDescriptionProps {
    customersList: IUserListItem[];
    workSpace: IWorkSpace;
    onClickUpdateWorkSpaceInfo: () => void;
    onClickCreateCustomer: () => void;
}

const WorkSpacePageDescription = (props: IWorkSpacePageDescriptionProps) => {
    const classes = useStyles();
    const {
        customersList,
        workSpace: { workSpaceName, workSpaceDescription, creationDate },
        onClickUpdateWorkSpaceInfo,
        onClickCreateCustomer,
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <WorkSpaceHeader
                    workSpaceName={workSpaceName}
                    workSpaceDescription={workSpaceDescription}
                    workSpaceCreationDate={creationDate}
                    onClickUpdateWorkSpaceInfo={onClickUpdateWorkSpaceInfo}
                />
                <CustomersList customersList={customersList} onClickCreateCustomer={onClickCreateCustomer} />
            </div>
        </div>
    );
};

export default WorkSpacePageDescription;
