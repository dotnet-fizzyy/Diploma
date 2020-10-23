import { createStyles, makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import classnames from "classnames";
import React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& span": {
        marginLeft: "7px",
      },
    },
    iconUser: {
      fontSize: "26px",
      color: "black",
    },
    currentStoryStatus: {
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
      "& span": {
        display: "block",
        fontSize: "18px",
        fontWeight: "bold",
        margin: "4px 0",
        textAlign: "center",
      },
    },
    currentBlocked: {
      backgroundColor: "red",
      color: "darkred",
    },
    currentReady: {
      backgroundColor: "green",
      color: "darkgreen",
    },
  })
);

export interface IStoryFooterProps {
  avatarLink: string;
  userId: string;
  isReady: boolean;
  isBlocked: boolean;
}

const StoryFooter = (props: IStoryFooterProps) => {
  const classes = useStyles();
  const { userId, isBlocked, isReady } = props;

  return (
    <React.Fragment>
      <div className={classes.footer}>
        <AccountCircleIcon className={classes.iconUser} />
        <span>{userId ? userId : "No owner"}</span>
      </div>
      {(isReady || isBlocked) && (
        <div
          className={classnames(classes.currentStoryStatus, {
            [classes.currentReady]: isReady,
            [classes.currentBlocked]: isBlocked,
          })}
        >
          <span>{isReady ? "Ready" : "Blocked"}</span>
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(StoryFooter);
