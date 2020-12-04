import { TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        nameContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        title: {
            fontFamily: 'Poppins',
            fontSize: '20px',
            marginBottom: '7px',
        },
        textField: {
            fontFamily: 'Poppins',
            fontSize: '18px',
        },
    })
);

export interface IStoryTextFieldProps {
    value: string;
    name: string;
    title: string;
    isTextArea?: boolean;
    onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StoryTextField = (props: IStoryTextFieldProps) => {
    const classes = useStyles();
    const { value, title, name, onChangeValue, isTextArea } = props;

    return (
        <div className={classes.nameContainer}>
            <p className={classes.title}>{title}</p>
            <TextField
                InputProps={{ classes: { input: classes.textField } }}
                value={value}
                name={name}
                multiline={isTextArea}
                variant="outlined"
                onChange={onChangeValue}
            />
        </div>
    );
};

export default StoryTextField;
