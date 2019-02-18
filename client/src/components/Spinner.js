import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  page: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  component: {
    position: 'relative',
  }
});

const Spinner = props => {
  const { classes, page } = props;
  const size = page ? 68 : 24;
  return (
    <div className={page ? classes.page : classes.component}>
      <CircularProgress
        size={size}
        className={page ? classes.progress : classes.buttonProgress}
        color="secondary"
      />
    </div>
  );
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spinner);