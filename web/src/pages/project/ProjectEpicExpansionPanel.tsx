import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import Accordion from '../../components/common/Accordion';
import { DateFormat } from '../../constants';
import { IEpic } from '../../types/epicTypes';
import { ISprint } from '../../types/sprintTypes';
import ProjectEpicDetailsContainer from './ProjectEpicDetailsContainer';

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

export interface IProjectEpicExpansionPanelProps {
    selectedEpicId: string;
    epic: IEpic;
    sprints: ISprint[];
    onClickSelectEpic: (epicId: string) => void;
    onClickCreateSprint: () => void;
}

const ProjectEpicExpansionPanel = (props: IProjectEpicExpansionPanelProps) => {
    const classes = useStyles();
    const { selectedEpicId, sprints, epic, onClickSelectEpic, onClickCreateSprint } = props;

    const onChange = (event: React.ChangeEvent<{}>, expanded: boolean) => {
        onClickSelectEpic(expanded ? epic.epicId : '');
    };

    const getSummary = (): React.ReactNode => (
        <>
            <span className={classes.text}>{epic.epicName}</span>
            <span className={classnames(classes.text, classes.descriptionText, classes.headerDates)}>
                {moment(epic.startDate).format(DateFormat)} - {moment(epic.endDate).format(DateFormat)}
            </span>
        </>
    );

    return (
        <Accordion
            expanded={selectedEpicId === epic.epicId}
            onChange={onChange}
            summary={getSummary()}
            details={
                <ProjectEpicDetailsContainer epic={epic} sprints={sprints} onClickCreateSprint={onClickCreateSprint} />
            }
        />
    );
};

export default React.memo(ProjectEpicExpansionPanel);
