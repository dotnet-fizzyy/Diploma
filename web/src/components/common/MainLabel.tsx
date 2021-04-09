import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

export enum LabelType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

const useStyles = makeStyles(() =>
    createStyles({
        root: ({ variant }: IMainLabelProps) => ({
            fontFamily: 'Poppins',
            wordBreak: 'break-word',
            fontSize: variant === LabelType.PRIMARY ? '24px' : '20px',
            color: '#242126',
            fontWeight: 600,
        }),
    })
);

export interface IMainLabelProps {
    title: string;
    variant: LabelType;
}

const MainLabel = (props: IMainLabelProps) => {
    const classes = useStyles(props);
    const { title } = props;

    return <span className={classes.root}>{title}</span>;
};

export default MainLabel;
