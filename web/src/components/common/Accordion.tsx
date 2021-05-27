import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            boxShadow: 'none',
            border: '1px solid #AFC1C4',
            borderColor: 'rgba(175, 193, 196, 0.2)',
            borderRadius: '5px',
        },
        expandIcon: {
            color: '#AFC1C4',
        },
        text: {
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '16px',
            color: '#242126',
        },
        descriptionText: {
            fontWeight: 400,
            color: '#AFC1C4',
        },
        headerDates: {
            marginLeft: '10px',
        },
        accordionDetailsRoot: {
            paddingLeft: '20px',
            paddingRight: '20px',
        },
        accordionSummaryRoot: {
            padding: '20px',
        },
    })
);

export interface IAccordionProps {
    expanded: boolean;
    onChange: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
    summary: React.ReactNode;
    details: React.ReactNode;
}

const Accordion = (props: IAccordionProps) => {
    const classes = useStyles();
    const { summary, details, expanded, onChange } = props;

    return (
        <MuiAccordion expanded={expanded} onChange={onChange} className={classes.root}>
            <AccordionSummary
                expandIcon={<ExpandMore className={classes.expandIcon} />}
                classes={{ root: classes.accordionDetailsRoot }}
            >
                {summary}
            </AccordionSummary>
            <AccordionDetails classes={{ root: classes.accordionSummaryRoot }}>{details}</AccordionDetails>
        </MuiAccordion>
    );
};

export default Accordion;
