import { Avatar, Tooltip } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { IUserListItem } from '../../types/userTypes';
import { IWorkSpaceTable } from '../../types/workSpaceTypes';
import { getFirstNameLetter } from '../../utils';
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
    workSpaceTable: IWorkSpaceTable;
    onClickViewProject: (projectId: string) => void;
}

const WorkSpaceTable = (props: IWorkSpaceTableProps) => {
    const classes = useStyles();
    const { workSpaceTable, onClickViewProject } = props;

    const getCustomerItem = (customer: IUserListItem): React.ReactNode => (
        <div className={classes.customerItemContainer} key={customer.userId}>
            <Tooltip title={customer.userName}>
                <Avatar className={classes.avatar} src={customer.avatarLink}>
                    {getFirstNameLetter(customer.userName)}
                </Avatar>
            </Tooltip>
        </div>
    );

    return (
        <div className={classes.root}>
            <div className={classes.row}>
                <div className={classes.cell}>
                    <span className={classnames(classes.text, classes.header)}>Projects</span>
                </div>
                <div className={classes.cell}>
                    <span className={classnames(classes.text, classes.header)}>Teams</span>
                </div>
                <div className={classes.cell}>
                    <span className={classnames(classes.text, classes.header)}>Customers</span>
                </div>
                <div className={classes.cell} />
            </div>
            {workSpaceTable && workSpaceTable.items && workSpaceTable.items.length
                ? workSpaceTable.items.map(({ project, teams, customer }) => (
                      <div key={project.projectId} className={classes.row}>
                          <div className={classes.cell}>
                              <span className={classes.text}>{project.projectName}</span>
                          </div>
                          <div className={classes.cell}>
                              <span className={classes.text}>
                                  {teams && teams.length
                                      ? teams.map((x) => <div key={x.teamId}>{x.teamName}</div>)
                                      : null}
                              </span>
                          </div>
                          <div className={classes.cell}>
                              <span className={classes.text}>{getCustomerItem(customer)}</span>
                          </div>
                          <div className={classes.cell}>
                              <div className={classes.buttonContainer}>
                                  <Button
                                      label="View"
                                      disabled={false}
                                      onClick={() => onClickViewProject(project.projectId)}
                                  />
                              </div>
                          </div>
                      </div>
                  ))
                : null}
        </div>
    );
};

export default WorkSpaceTable;
