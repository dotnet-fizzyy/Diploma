import { withStyles, Button } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = () =>
    createStyles({
        root: {
            height: '100%',
            minWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        firstLabel: {
            fontSize: '30px',
            fontFamily: 'Roboto',
        },
        secondLabel: {
            marginTop: '20px',
            fontSize: '20px',
            fontFamily: 'Roboto',
        },
        button: {
            marginTop: '40px',
            fontFamily: 'Roboto',
            width: '150px',
        },
    });

export interface IErrorBoundaryState {
    hasErrors: boolean;
}

export interface IErrorBoundaryProps {
    children: React.ReactNode;
    classes: Record<'root' | 'firstLabel' | 'secondLabel' | 'button', string>;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = { hasErrors: false };
    }

    static getDerivedStateFromError(error: Error) {
        console.log(error);

        return { hasErrors: true };
    }

    refreshPage = () => {
        window.location.reload();
    };

    render() {
        const { children, classes } = this.props;
        const { hasErrors } = this.state;

        if (hasErrors) {
            return (
                <div className={classes.root}>
                    <span className={classes.firstLabel}>Some error occurred :(</span>
                    <span className={classes.secondLabel}>Please, refresh page</span>
                    <Button className={classes.button} onClick={this.refreshPage} variant="outlined" color="primary">
                        Refresh
                    </Button>
                </div>
            );
        }

        return children;
    }
}

export default withStyles(useStyles)(ErrorBoundary);
