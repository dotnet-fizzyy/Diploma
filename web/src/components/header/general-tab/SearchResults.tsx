import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { ColumnNames } from '../../../constants/boardConstants';
import { UserPosition, UserRole } from '../../../constants/userConstants';
import { IStorySimpleModel } from '../../../types/storyTypes';
import { IUserSimpleModel } from '../../../types/userTypes';
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
            '&:last-child': {
                marginBottom: 0,
            },
        },
        spinnerContainer: {
            paddingLeft: '50px',
        },
    })
);

export interface ISearchResultsProps {
    searching: boolean;
    focusedField: boolean;
    searchTerm: string;
    searchUsers: IUserSimpleModel[];
    searchStories: IStorySimpleModel[];
}

const SearchResults = (props: ISearchResultsProps) => {
    const classes = useStyles();
    const { searching, focusedField, searchTerm, searchStories, searchUsers } = props;

    const usersFound: boolean = !!(searchUsers && searchUsers.length);
    const storiesFound: boolean = !!(searchStories && searchStories.length);

    return (
        <div className={classes.root}>
            {focusedField && searchTerm && (
                <div className={classes.body}>
                    {searching && (
                        <div className={classes.spinnerContainer}>
                            <Spinner size={16} />
                        </div>
                    )}
                    {!searching && storiesFound ? (
                        <div>
                            {searchStories.map((x) => (
                                <div key={x.storyId} className={classes.item}>
                                    <span className={classes.text}>{x.title}</span>
                                    <span className={classnames(classes.text, classes.descText)}>
                                        {ColumnNames[x.columnType]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {!searching && usersFound ? (
                        <div>
                            {searchUsers.map((x) => (
                                <div key={x.userId} className={classes.item}>
                                    <span className={classes.text}>{x.userName}</span>
                                    <span className={classnames(classes.text, classes.descText)}>
                                        {UserRole[x.userRole]}, {UserPosition[x.userPosition]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {!searching && !storiesFound && !usersFound && searchTerm && focusedField ? (
                        <span className={classes.text}>No items found</span>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
