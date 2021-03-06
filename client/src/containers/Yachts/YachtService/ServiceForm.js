import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { GetCompanies } from 'containers/Getters';
import { GetYachts } from 'containers/Getters';
import Heading from 'components/Heading';
import SectionTitle from 'components/SectionTitle';
import Spinner from 'components/Spinner';
import Service from 'components/Service';

const styles = () => ({
  card: {
    position: 'relative',
  },
  submitButton: {
    display: 'block',
    marginLeft: '8px',
  },
});

const ServiceForm = props => {
  const {
    yachtService,
    taxValues,
    serviceTypes,
    totalPrice,
    handleCheckBox,
    onChange,
    onSubmit,
    handleChangeChargedCurrency,
    handleCaclulateCostOnBlur,
    handleCalculateChargedAmountOnBlur,
    handleCalculateTaxOnBlur,
    handleAddPercentageToChargedAmountOnBlur,
    errors,
    classes,
    isDataFetching,
  } = props;

  if (isDataFetching) {
    return <Spinner />;
  }

  return (
    <div>
      <Heading text="Add Service" />
      <Card className={classes.card}>
        <CardContent>
          <SectionTitle text="Select Yacht (& Company)" />
          <GetYachts label="Choose yacht" />
          <GetCompanies label="Choose company" />
        </CardContent>
      </Card>
      <form onSubmit={onSubmit}>
        <Service
          {...{
            service: yachtService,
            checkboxHandler: handleCheckBox,
            taxValues,
            serviceTypes,
            totalPrice,
            onChange,
            onSubmit,
            handleChangeChargedCurrency,
            handleCaclulateCostOnBlur,
            handleCalculateChargedAmountOnBlur,
            handleCalculateTaxOnBlur,
            handleAddPercentageToChargedAmountOnBlur,
            errors,
          }}
        />
        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Service
        </Button>
      </form>
    </div>
  );
};

export default withStyles(styles)(ServiceForm);
