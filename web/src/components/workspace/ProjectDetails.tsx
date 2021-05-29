import { createStyles, makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import InfoIcon from '@material-ui/icons/Info';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../constants';
import { ITeamSimpleModel } from '../../types/teamTypes';
import Button, { ButtonVariant } from '../common/Button';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        },
        text: {
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '16px',
            color: '#242126',
        },
        mainHeader: {
            fontWeight: 600,
            marginBottom: '15px',
        },
        teamContainer: {
            maxWidth: '800px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '10px',
            alignItems: 'center',
        },
        addText: {
            color: '#AFC1C4',
        },
        footer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        cardItem: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
        },
        buttonContainer: {
            width: '30px',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '20px',
            borderRadius: '5px',
            cursor: 'pointer',
            flex: 'none',
        },
        primaryButton: {
            backgroundColor: '#75BAF7',
            color: '#FFF',
        },
        buttonsContainers: {
            width: '120px',
            marginLeft: '20px',
        },
    })
);

export interface IProjectSummaryInfoProps {
    projectId: string;
    teams: ITeamSimpleModel[];
    onClickViewProject: (projectId: string) => void;
    onClickViewTeam: (teamId: string) => void;
    onClickRemoveProject: () => void;
}

const ProjectDetails = (props: IProjectSummaryInfoProps) => {
    const classes = useStyles();
    const { projectId, teams, onClickViewProject, onClickViewTeam, onClickRemoveProject } = props;

    const onClick = () => {
        onClickViewProject(projectId);
    };

    return (
        <div className={classes.root}>
            <span className={classnames(classes.text, classes.mainHeader)}>Teams</span>
            {teams && teams.length
                ? teams.map((x) => (
                      <div key={x.teamId} className={classes.teamContainer}>
                          <span className={classnames(classes.text, classes.cardItem)}>{x.teamName}</span>
                          <span className={classnames(classes.text, classes.cardItem)}>
                              <span className={classnames(classes.text, classes.addText)}>Creation date: </span>
                              {moment(x.creationDate).format(DateFormat)}
                          </span>
                          <div
                              className={classnames(classes.cardItem, classes.buttonContainer, classes.primaryButton)}
                              onClick={() => onClickViewTeam(x.teamId)}
                          >
                              <InfoIcon fontSize="small" />
                          </div>
                      </div>
                  ))
                : null}
            <div className={classes.footer}>
                <div className={classes.buttonsContainers}>
                    <Button startIcon={<InfoIcon />} label="View" disabled={false} onClick={onClick} />
                </div>
                <div className={classes.buttonsContainers}>
                    <Button
                        startIcon={<DeleteOutlineIcon />}
                        label="Remove"
                        disabled={false}
                        onClick={onClickRemoveProject}
                        buttonVariant={ButtonVariant.DANGER}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
