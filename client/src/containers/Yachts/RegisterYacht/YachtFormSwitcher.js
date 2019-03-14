import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import YachtSelector from 'containers/YachtSelector';
import Heading from 'components/Heading';
import UpdateYachtForm from './UpdateYachtForm';
import YachtForm from './YachtForm';

const styles = () => ({
  heading: {
    marginTop: '16px',
    marginBottom: '16px',
  },
});

const YachtFormSwitcher = props => {
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
      <YachtSelector
        {...{
          setIsYachtSelected,
          card: true,
          label: 'Existing Yachts',
        }}
      />
      {!isYachtSelected && (
        <React.Fragment>
          <Heading text="or Add New Yacht" class={classes.heading} />
          <YachtForm yachtProps={yachtProps} />
        </React.Fragment>
      )}
      {isYachtSelected && (
        <React.Fragment>
          <Heading text="Updating Yacht" class={classes.heading} />
          <UpdateYachtForm {...{ isYachtSelected }} />
        </React.Fragment>
      )}
    </div>
  );
};

export default withStyles(styles)(YachtFormSwitcher);
