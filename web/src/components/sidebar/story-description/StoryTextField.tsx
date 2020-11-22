import { TextField } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    sectionContainer: {
      marginTop: "20px",
    },
    nameContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  })
);

export interface IStoryTextFieldProps {
  value: string;
  title: string;
  onChangeValue: (value: string) => void;
  isTextArea?: boolean;
}

const StoryTextField = (props: IStoryTextFieldProps) => {
  const classes = useStyles();
  const { value, title, onChangeValue, isTextArea } = props;

  return (
    <div className={classes.nameContainer}>
      <p>{title}</p>
      <TextField
        value={value}
        multiline={isTextArea}
        variant="outlined"
        onChange={(event: { target: { value: string } }) =>
          onChangeValue(event.target.value)
        }
      />
    </div>
  );
};

export default StoryTextField;
