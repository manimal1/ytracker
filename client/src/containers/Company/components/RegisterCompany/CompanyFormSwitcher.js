import React from 'react';
import PropTypes from 'prop-types';

import { default as CompanySelector } from '../CompanySelector';
import { default as UpdateCompanyForm } from './UpdateCompanyForm';
import { default as CompanyForm } from './CompanyForm';

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
    company,
    isCompanySelected,
    setIsCompanySelected,
    onChange,
    onSubmit,
    errors,
    isDataFetching,
  } = props;

  const companyProps = {
    company,
    onChange,
    onSubmit,
    errors,
    isDataFetching,
  };

  return (
    <div className="company-forms">
      <Heading text="Update Company" class={classes.heading} />
      <CompanySelector {...{ setIsCompanySelected }} />
      {!isCompanySelected &&
        <React.Fragment>
          <Heading text="or Add New Company" class={classes.heading} />
          <CompanyForm {...companyProps} />
        </React.Fragment>
      }
      {isCompanySelected &&
        <React.Fragment>
          <Heading text="Updating Company" class={classes.heading} />
          <UpdateCompanyForm {...{isCompanySelected}} />
        </React.Fragment>
      }
    </div>
  );
}

YachtFormSwitcher.propTypes = {
  selectedYachtProps: PropTypes.object,
  isCompanySelected: PropTypes.bool,
  setIsCompanySelected: PropTypes.func,
}

export default withStyles(styles)(YachtFormSwitcher);
