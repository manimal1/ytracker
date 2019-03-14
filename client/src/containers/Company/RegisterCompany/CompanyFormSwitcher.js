import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { GetCompanies } from 'containers/Getters';
import UpdateCompanyForm from './UpdateCompanyForm';
import CompanyForm from './CompanyForm';

import Heading from 'components/Heading';

const styles = () => ({
  heading: {
    marginTop: '16px',
    marginBottom: '16px',
  },
});

const YachtFormSwitcher = props => {
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
      <GetCompanies
        {...{
          setIsCompanySelected,
          card: true,
          label: 'Existing Companies',
        }}
      />
      {!isCompanySelected && (
        <React.Fragment>
          <Heading text="or Add New Company" class={classes.heading} />
          <CompanyForm {...companyProps} />
        </React.Fragment>
      )}
      {isCompanySelected && (
        <React.Fragment>
          <Heading text="Updating Company" class={classes.heading} />
          <UpdateCompanyForm {...{ isCompanySelected }} />
        </React.Fragment>
      )}
    </div>
  );
};

export default withStyles(styles)(YachtFormSwitcher);
