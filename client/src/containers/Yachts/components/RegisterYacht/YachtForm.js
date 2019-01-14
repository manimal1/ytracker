import React from 'react';
import { default as setCompanyFormInputs } from '../../../../utils/setCompanyFormInputs';
import {
  setNameInfo,
  setRequiredInfo,
  setYachtMetrics,
  setTaxInfo,
  setBuildInfo,
  setDataGroups,
  setCompanyGroups,
} from './setYachtFormGroups';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

import SectionTitle from '../../../../components/SectionTitle';
import TextFieldList from '../../../../components/TextFieldList';
import ExpansionPanelGroup from '../../../../components/ExpansionPanelGroup';
import Spinner from '../../../../components/Spinner';

const styles = theme => ({
  card: {
    marginTop: '8px',
    marginBottom: '8px',
  },
  panelContent: {
    width: '100%',
  },
  heading: {
    marginTop: '16px',
    marginBottom: '16px',
  },
  nameField: {
    width: "calc(100% - 126px)",
  },
  textField: {
    marginLeft: '8px',
    marginRight: '8px',
    [theme.breakpoints.up('lg')]: {
      minWidth: 'calc(33% - 16px)',
    },
    [theme.breakpoints.down('md')]: {
      minWidth: 'calc(50% - 16px)',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
  formControl: {
    minWidth: '110px',
    marginTop: '16px',
  },
  submitButton: {
    marginTop: '16px',
    marginBottom: '16px',
  },
});

const YachtForm = (props) => {
  const {
    isYachtSelected,
    selectedYacht,
    onChange,
    onCompanyChange,
    handleCheckBox,
    onSubmit,
    errors,
    isDataFetching,
  } = props.yachtProps;
  const {
    name, email, yachttype, active, phone,
    loa, draft, beam, grosstonnage,
    buildcompany, buildyear, refityear,
    cruisinglicense, taxid,
    billingcompany, owningcompany, managementcompany,
  } = selectedYacht;
  const { classes } = props;
  const nameInfo = setNameInfo({name, errors});
  const requiredInfo = setRequiredInfo({email, phone, errors});
  const yachtMetrics = setYachtMetrics({ loa, draft, beam, grosstonnage });
  const taxInfo = setTaxInfo({cruisinglicense, taxid});
  const buildInfo = setBuildInfo({ buildcompany, buildyear, refityear });
  const billingCompanyInfo = setCompanyFormInputs('billing', billingcompany);
  const owningCompanyInfo = setCompanyFormInputs('owning', owningcompany);
  const managementCompanyInfo = setCompanyFormInputs('management', managementcompany);
  const dataGroups = setDataGroups(yachtMetrics, taxInfo, buildInfo);
  const companyGroups = setCompanyGroups(billingCompanyInfo, owningCompanyInfo, managementCompanyInfo);

  if (isDataFetching) {
    return <Spinner />;
  }

  return (
    <form onSubmit={onSubmit}>
      <Card className={classes.card}>
        <CardContent>
          <SectionTitle text="Required Info" />
          <FormControlLabel
            control={
              <Checkbox
                checked={active}
                onChange={handleCheckBox('active')}
                value="active"
              />
            }
            label="Active"
          />
          <FormGroup row>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="yachttype">Yacht Type</InputLabel>
              <Select
                value={yachttype}
                onChange={onChange}
                inputProps={{
                  name: 'yachttype',
                  id: 'yachttype',
                }}
              >
                <MenuItem value={'MY'}>M/Y</MenuItem>
                <MenuItem value={'SY'}>S/Y</MenuItem>
              </Select>
            </FormControl>
            <TextFieldList
              list={nameInfo}
              classname={`${classes.textField} ${classes.nameField}`}
              onChange={onChange}
            />
          </FormGroup>
          <TextFieldList
            list={requiredInfo}
            classname={classes.textField}
            onChange={onChange}
          />
        </CardContent>
      </Card>

      {
        dataGroups.map((dataGroup, index) => (
          <ExpansionPanelGroup
            key={`${dataGroup.key}-${index}`}
            label={dataGroup.label}
            classes={classes}
          >
            <TextFieldList
              list={dataGroup.array}
              classname={classes.textField}
              onChange={onChange}
            />
          </ExpansionPanelGroup>
        ))
      }
      {
        companyGroups.map((companyGroup, index) => (
          <ExpansionPanelGroup
            key={`${companyGroup.key}-${index}`}
            label={companyGroup.label}
            classes={classes}
          >
            <TextFieldList
              list={companyGroup.array}
              classname={classes.textField}
              onChange={(e) => onCompanyChange(e, companyGroup.key)}
            />
          </ExpansionPanelGroup>
        ))
      }

      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.submitButton}
      >
        {!isYachtSelected ? 'Register Yacht' : 'Update Yacht'}
      </Button>
    </form>
  );
}

export default withStyles(styles)(YachtForm);
