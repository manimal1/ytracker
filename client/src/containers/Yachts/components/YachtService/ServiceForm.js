import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { default as CompanySelector } from '../../../CompanySelector';
import { default as YachtSelector } from '../../../YachtSelector';
import SectionTitle from '../../../../components/SectionTitle';
import Spinner from '../../../../components/Spinner';
import Service from '../../../../components/Service';

const styles = theme => ({
  card: {
    position: 'relative',
  },
  submitButton: {
    display: 'block',
    marginLeft: '8px',
  },
});

const ServiceForm = (props) => {
  const {
    yachtService,
    handleCheckBox,
    onChange,
    onSubmit,
    onBlur,
    handleCalculateTax,
    errors,
    classes,
    isDataFetching,
  } = props;

  if (isDataFetching) {
    return <Spinner />;
  }

  return (
    <div>
      <SectionTitle text="Service Info" />
      <Card className={classes.card}>
        <CardContent>
          <YachtSelector label="Choose yacht" />
          <CompanySelector label="Choose company" />
        </CardContent>
      </Card>
      <form onSubmit={onSubmit}>
        <Service
          service={yachtService}
          checkboxHandler={handleCheckBox}
          onChange={onChange}
          onSubmit={onSubmit}
          onBlur={onBlur}
          handleCalculateTax={handleCalculateTax}
          errors={errors}
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
}

export default withStyles(styles)(ServiceForm);
