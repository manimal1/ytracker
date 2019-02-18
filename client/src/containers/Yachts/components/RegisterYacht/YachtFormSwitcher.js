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
    selectedYacht,
    isYachtSelected,
    setIsYachtSelected,
    onChange,
    onCompanyChange,
    handleCheckBox,
    onSubmit,
    errors,
    isDataFetching,
  } = props;

  const yachtProps = {
    isYachtSelected,
    selectedYacht,
    onChange,
    onCompanyChange,
    handleCheckBox,
    onSubmit,
    errors,
    isDataFetching,
  };

  return (
    <div className="yacht-forms">
      <Heading text="Update Yacht" class={classes.heading} />
      <YachtSelector {...{ 
        setIsYachtSelected,
        card: true,
        label: 'Existing Yachts',
      }} />
      {!isYachtSelected &&
        <React.Fragment>
          <Heading text="or Add New Yacht" class={classes.heading} />
          <YachtForm yachtProps={yachtProps} />
        </React.Fragment>
      }
      {isYachtSelected &&
        <React.Fragment>
          <Heading text="Updating Yacht" class={classes.heading} />
          <UpdateYachtForm {...{isYachtSelected}} />
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
