import { TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        sectionContainer: {
            marginTop: '20px',
        },
        nameContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
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
            <p>{title}</p>
            <TextField value={value} name={name} multiline={isTextArea} variant="outlined" onChange={onChangeValue} />
        </div>
    );
};

export default StoryTextField;
