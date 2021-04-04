import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: ({ isPrimaryTitle }: IFormInputLabelProps) => ({
            fontSize: '18px',
            fontFamily: 'Poppins',
            color: isPrimaryTitle ? '#242126' : '#75BAF7',
            marginBottom: '4px',
            fontWeight: 600,
        }),
    })
);

export interface IFormInputLabelProps {
    isPrimaryTitle: boolean;
    label: string;
}

const FormInputLabel = (props: IFormInputLabelProps) => {
    const classes = useStyles(props);
    const { label } = props;

    return <span className={classes.root}>{label}</span>;
};

export default FormInputLabel;
