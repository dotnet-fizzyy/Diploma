import { TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { IStorySimpleModel } from '../../../types/storyTypes';
import { IUserSimpleModel } from '../../../types/userTypes';
import SearchResults from './SearchResults';

const useStyles = makeStyles(() =>
    createStyles({
        input: {
            border: 'none',
            color: '#212624',
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 500,
            '&::placeholder': {
                color: '#AFC1C4',
                opacity: '1 !important',
            },
        },
        searchResults: {
            position: 'absolute',
            top: '100%',
            width: '100%',
            zIndex: 10,
            backgroundColor: '#FFF',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
        },
        resultStory: {
            fontFamily: 'Poppins',
            height: '50px',
            fontSize: '18px',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'lightgrey',
            },
        },
        sprintName: {
            marginTop: '3px',
            fontSize: '16px',
        },
        icon: {
            color: '#AFC1C4',
            margin: '0 20px 0 10px',
        },
    })
);

export interface ISearchFieldProps {
    searchTerm: string;
    searchUsers: IUserSimpleModel[];
    searchStories: IStorySimpleModel[];
    searching: boolean;
    onBlur: () => void;
    onChangeSearchTerm: (value: string) => void;
}

const SearchField = (props: ISearchFieldProps) => {
    const classes = useStyles();
    const { onBlur, searching, searchUsers, searchStories, searchTerm, onChangeSearchTerm } = props;

    const [focused, setIsFocused] = useState<boolean>(false);

    const onChange = (event: { target: { value: string } }): void => {
        onChangeSearchTerm(event.target.value);
    };

    const onFocus = (): void => {
        if (!focused) {
            setIsFocused(true);
            searchTerm && onChangeSearchTerm(searchTerm);
        }
    };

    const onBlurField = (): void => {
        onBlur();
        setIsFocused(false);
    };

    return (
        <>
            <TextField
                placeholder="Search"
                value={searchTerm}
                onChange={onChange}
                onBlur={onBlurField}
                onFocus={onFocus}
                fullWidth={true}
                InputProps={{
                    disableUnderline: true,
                    startAdornment: <SearchIcon className={classes.icon} />,
                    classes: { input: classes.input },
                }}
            />
            <div className={classes.searchResults}>
                <SearchResults
                    searching={searching}
                    focusedField={focused}
                    searchTerm={searchTerm}
                    searchUsers={searchUsers}
                    searchStories={searchStories}
                />
            </div>
        </>
    );
};

export default SearchField;
