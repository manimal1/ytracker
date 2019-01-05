import React from 'react';
import PropTypes from 'prop-types';

import { default as YachtSelector } from '../../../YachtSelector';
import { default as UpdateYachtForm } from './UpdateYachtForm';
import { default as YachtForm } from './YachtForm';

import { withStyles } from '@material-ui/core/styles';

import Heading from '../../../../components/Heading';

const styles = theme => ({
  heading: {
    marginTop: '16px',
    marginBottom: '16px',
  },
});

const YachtFormSwitcher = (props) => {
  const {
    classes,
    selectedYachtProps,
    isYachtSelected,
    setIsYachtSelected,
  } = props;

  return (
    <div className="yacht-forms">
      <Heading text="Update Yacht" class={classes.heading} />
      <YachtSelector {...{ setIsYachtSelected }} />
      {!isYachtSelected &&
        <React.Fragment>
          <Heading text="or Add New Yacht" class={classes.heading} />
          <YachtForm formProps={props} />
        </React.Fragment>
      }
      {isYachtSelected &&
        <React.Fragment>
          <Heading text="Updating Yacht" class={classes.heading} />
          <UpdateYachtForm selectedYacht={selectedYachtProps} />
        </React.Fragment>
      }
    </div>
  );
}

YachtFormSwitcher.propTypes = {
  selectedYachtProps: PropTypes.object,
  isYachtSelected: PropTypes.bool,
  setIsYachtSelected: PropTypes.func,
}

export default withStyles(styles)(YachtFormSwitcher);
