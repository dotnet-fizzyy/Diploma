import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
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
            marginTop: '10px',
            '&:last-child': {
                marginTop: '3px',
            },
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            color: '#242126',
        },
        descriptionText: {
            marginTop: '5px',
            fontWeight: 'bold',
        },
        shortLabelDesc: {
            marginTop: '20px',
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
}

const PageHeaderTab = (props: IPageHeaderTab) => {
    const classes = useStyles();
    const { title, descriptionItems } = props;

    return (
        <div className={classes.root}>
            <div className={classes.descriptionHeaderPart}>
                <MainLabel title={title} variant={LabelType.PRIMARY} />
                <div className={classes.shortLabelDesc}>
                    <MainLabel title="Short info" variant={LabelType.SECONDARY} />
                </div>
                {descriptionItems && descriptionItems.length
                    ? descriptionItems.map((item: IPageHeaderTabDescription, index: number) => (
                          <div key={index} className={classes.descriptionContainer}>
                              <span className={classes.text}>
                                  {item.title}:{' '}
                                  <span className={classes.descriptionText}>{item.description || '-'}</span>
                              </span>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default PageHeaderTab;
