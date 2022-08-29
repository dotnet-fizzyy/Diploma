import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../../constants';
import { UserPosition, UserRole } from '../../../constants/userConstants';
import { IProjectSimpleModel } from '../../../types/project';
import { ITeamSimpleModel } from '../../../types/team';
import { isUserCustomer } from '../../../utils';
import Spinner from '../../common/Spinner';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            position: 'absolute',
            top: '100%',
            width: '100%',
            zIndex: 10,
            borderTop: '1px solid lightgrey',
        },
        body: {
            border: '1px solid lightgrey',
            borderTop: 'none',
            boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
            padding: '5px',
            backgroundColor: '#FFF',
        },
        text: {
            fontFamily: 'Poppins',
            fontWeight: 500,
            color: '#212624',
            fontSize: '14px',
        },
        descText: {
            fontWeight: 400,
            color: '#AFC1C4',
        },
        item: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            cursor: 'pointer',
            marginBottom: '5px',
        },
        spinnerContainer: {
            paddingLeft: '50px',
        },
    })
);

export interface ISearchResultsProps {
    userRole: UserRole;
    userPosition: UserPosition;
    searching: boolean;
    focusedField: boolean;
    searchTerm: string;
    searchProjects: IProjectSimpleModel[];
    searchTeams: ITeamSimpleModel[];
    onClickViewTeam: (teamId: string) => void;
    onClickViewProject: (projectId: string) => void;
}

const SearchResults = (props: ISearchResultsProps) => {
    const classes = useStyles();
    const {
        userRole,
        userPosition,
        searching,
        focusedField,
        searchTerm,
        searchTeams,
        searchProjects,
        onClickViewTeam,
        onClickViewProject,
    } = props;

    const teamsFound: boolean = !!(searchTeams && searchTeams.length);
    const projectsFound: boolean = !!(searchProjects && searchProjects.length);

    return (
        <div className={classes.root}>
            {focusedField && searchTerm && (
                <div className={classes.body}>
                    {searching && (
                        <div className={classes.spinnerContainer}>
                            <Spinner size={16} />
                        </div>
                    )}
                    {!searching && isUserCustomer(userRole, userPosition) && projectsFound ? (
                        <div>
                            {searchProjects.map((x) => (
                                <div
                                    key={x.projectId}
                                    className={classes.item}
                                    onMouseDown={() => onClickViewProject(x.projectId)}
                                >
                                    <span className={classes.text}>{x.projectName}</span>
                                    <span className={classnames(classes.text, classes.descText)}>
                                        {moment(x.startDate).format(DateFormat)} -{' '}
                                        {moment(x.endDate).format(DateFormat)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {!searching && teamsFound ? (
                        <div>
                            {searchTeams.map((x) => (
                                <div
                                    key={x.teamId}
                                    className={classes.item}
                                    onMouseDown={() => onClickViewTeam(x.teamId)}
                                >
                                    <span className={classes.text}>{x.teamName}</span>
                                    <span className={classnames(classes.text, classes.descText)}>{x.location}</span>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {!searching && !projectsFound && !teamsFound && searchTerm && focusedField ? (
                        <span className={classes.text}>No items found</span>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
