import { createStyles, makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Update';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../constants';
import { ISprint } from '../../types/sprintTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
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
        descriptionContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        itemContainer: {
            marginTop: '20px',
            padding: '10px',
            boxSizing: 'border-box',
            border: '1px solid #AFC1C4',
            borderColor: 'rgba(175, 193, 196, 0.2)',
            borderRadius: '5px',
            backgroundColor: '#FAFAFA',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        buttonContainer: {
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '20px',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        primaryButton: {
            backgroundColor: '#75BAF7',
            color: '#FFF',
        },
        removeButton: {
            backgroundColor: '#ffbdb9',
            color: 'red',
        },
    })
);

export interface ISprintsTabProps {
    sprints: ISprint[];
    onClickUpdateSprint: (sprintId: string) => void;
    onClickRemoveSprint: (sprintId: string) => void;
}

const SprintsTab = (props: ISprintsTabProps) => {
    const classes = useStyles();
    const { sprints, onClickUpdateSprint, onClickRemoveSprint } = props;

    return (
        <div className={classes.root}>
            {sprints && sprints.length
                ? sprints.map((x) => (
                      <div key={x.sprintId} className={classes.itemContainer}>
                          <span className={classes.text}>{x.sprintName}</span>
                          <div className={classes.descriptionContainer}>
                              <span className={classnames(classes.text, classes.descriptionText)}>
                                  {moment(x.startDate).format(DateFormat)} - {moment(x.endDate).format(DateFormat)}
                              </span>
                              <div
                                  className={classnames(classes.buttonContainer, classes.primaryButton)}
                                  onClick={() => onClickUpdateSprint(x.sprintId)}
                              >
                                  <UpdateIcon />
                              </div>
                              <div
                                  className={classnames(classes.buttonContainer, classes.removeButton)}
                                  onClick={() => onClickRemoveSprint(x.sprintId)}
                              >
                                  <DeleteOutlineIcon />
                              </div>
                          </div>
                      </div>
                  ))
                : null}
        </div>
    );
};

export default SprintsTab;
