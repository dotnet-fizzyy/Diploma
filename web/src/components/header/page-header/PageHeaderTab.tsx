import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../../constants';
import MainLabel, { LabelType } from '../../common/MainLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
        },
        descriptionHeaderPart: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
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
        creationDate: {
            marginLeft: '30px',
            fontSize: '14px',
        },
    })
);

export interface IPageHeaderTabDescription {
    title: string;
    description: string;
}

export interface IPageHeaderTab {
    title: string;
    descriptionItems: IPageHeaderTabDescription[];
    creationDate: Date;
    options?: React.ReactNode;
}

const PageHeaderTab = (props: IPageHeaderTab) => {
    const classes = useStyles();
    const { options, title, creationDate, descriptionItems } = props;

    const getDescription = (item: IPageHeaderTabDescription, index: number): React.ReactNode => (
        <div key={index} className={classes.descriptionContainer}>
            <span className={classnames(classes.text, classes.descriptionLabel)}>{item.title}</span>
            <span className={classnames(classes.text, classes.descriptionText)}>{item.description || '-'}</span>
        </div>
    );

    return (
        <div className={classes.root}>
            <div className={classes.descriptionHeaderPart}>
                <MainLabel title={title} variant={LabelType.PRIMARY} />
                <span className={classnames(classes.text, classes.creationDate)}>
                    Creation date: {moment(creationDate).format(DateFormat)}
                </span>
                {descriptionItems && descriptionItems.length ? descriptionItems.map(getDescription) : null}
            </div>
            {options}
        </div>
    );
};

export default PageHeaderTab;
