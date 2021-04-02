import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import MainLabel from '../../components/common/MainLabel';
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
        workSpaceHeader: {
            display: 'flex',
            flexDirection: 'row',
        },
        descriptionContainer: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            color: '#242126',
        },
        descriptionLabel: {
            fontWeight: 'bold',
        },
        descriptionText: {
            marginTop: '5px',
        },
    })
);

export interface IWorkSpacePageDescriptionProps {
    workSpace: IWorkSpace;
}

const WorkSpacePageDescription = (props: IWorkSpacePageDescriptionProps) => {
    const classes = useStyles();
    const {
        workSpace: { workSpaceName, workSpaceDescription },
    } = props;

    const getWorkSpaceHeader = (): React.ReactNode => (
        <>
            <MainLabel title={workSpaceName} />
            <div className={classes.descriptionContainer}>
                <span className={classnames(classes.text, classes.descriptionLabel)}>Description</span>
                <span className={classnames(classes.text, classes.descriptionText)}>{workSpaceDescription || '-'}</span>
            </div>
        </>
    );

    return (
        <div className={classes.root}>
            <div className={classes.body}>{getWorkSpaceHeader()}</div>
        </div>
    );
};

export default WorkSpacePageDescription;
