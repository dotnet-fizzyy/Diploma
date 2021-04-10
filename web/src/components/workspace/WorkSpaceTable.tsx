import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { IWorkSpacePageProject } from '../../types/workSpaceTypes';
import Button from '../common/Button';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '500px',
            overflowY: 'auto',
        },
        table: {
            boxShadow: 'none',
            backgroundColor: '#FAFAFA',
        },
        text: {
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '16px',
        },
        avatar: {
            width: '44px',
            height: '44px',
            fontSize: '22px',
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '10px',
        },
        cell: {
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: 0,
            margin: 'auto',
        },
        header: {
            fontWeight: 600,
        },
        buttonContainer: {
            margin: '0 0 0 auto',
            width: '150px',
        },
        customerItemContainer: {
            width: 'max-content',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
    })
);

export interface IWorkSpaceTableProps {
    workSpaceProjects: IWorkSpacePageProject[];
    onClickViewProject: (projectId: string) => void;
}

const WorkSpaceTable = (props: IWorkSpaceTableProps) => {
    const classes = useStyles();
    const { workSpaceProjects, onClickViewProject } = props;

    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <div className={classes.cell}>
                    <span className={classnames(classes.text, classes.header)}>Projects</span>
                </div>
                <div className={classes.cell}>
                    <span className={classnames(classes.text, classes.header)}>Teams</span>
                </div>
                <div className={classes.cell} />
            </div>
            {workSpaceProjects && workSpaceProjects.length
                ? workSpaceProjects.map(({ projectId, projectName, teams }) => (
                      <div key={projectId} className={classes.row}>
                          <div className={classes.cell}>
                              <span className={classes.text}>{projectName}</span>
                          </div>
                          <div className={classes.cell}>
                              <span className={classes.text}>
                                  {teams && teams.length ? (
                                      teams.map((x) => <div key={x.teamId}>{x.teamName}</div>)
                                  ) : (
                                      <span>-</span>
                                  )}
                              </span>
                          </div>
                          <div className={classes.cell}>
                              <div className={classes.buttonContainer}>
                                  <Button label="View" disabled={false} onClick={() => onClickViewProject(projectId)} />
                              </div>
                          </div>
                      </div>
                  ))
                : null}
        </div>
    );
};

export default WorkSpaceTable;
