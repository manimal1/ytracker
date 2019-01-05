import React from 'react';
import { default as setCompanyFormInputs } from '../../../../utils/setCompanyFormInputs';
import {
  setNameInfo,
  setRequiredInfo,
  setYachtMetrics,
  setTaxInfo,
  setBuildInfo,
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';

import SectionTitle from '../../../../components/SectionTitle';
import TextFieldList from '../../../../components/TextFieldList';

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
    name, email, yachttype, active, phone,
    loa, draft, beam, grosstonnage,
    buildcompany, buildyear, refityear,
    cruisinglicense, taxid,
    billingcompanyname, billingcompanyemail, billingcompanyphone, billingcompanymobile,
    billingcompanyaddressline1, billingcompanyaddressline2, billingcompanycity,  
    billingcompanypostalcode, billingcompanycountry,
    owningcompanyname, owningcompanyemail, owningcompanyphone, owningcompanymobile,
    owningcompanyaddressline1, owningcompanyaddressline2, owningcompanycity,  
    owningcompanypostalcode, owningcompanycountry,
    managementcompanyname, managementcompanyemail, managementcompanyphone,
    managementcompanymobile, managementcompanyaddressline1, managementcompanyaddressline2,
    managementcompanycity, managementcompanypostalcode, managementcompanycountry,
    onChange, handleCheckBox, onSubmit, errors,
  } = props.formProps;
  const { classes } = props;
  const nameInfo = setNameInfo({name, errors});
  const requiredInfo = setRequiredInfo({email, phone, errors});
  const yachtMetrics = setYachtMetrics({ loa, draft, beam, grosstonnage });
  const taxInfo = setTaxInfo({cruisinglicense, taxid});
  const buildInfo = setBuildInfo({ buildcompany, buildyear, refityear });
  const billingCompanyInfo = setCompanyFormInputs('billing', {
    name: billingcompanyname, email: billingcompanyemail, phone: billingcompanyphone,
    mobile: billingcompanymobile, address1: billingcompanyaddressline1, address2: billingcompanyaddressline2,
    city: billingcompanycity, postalcode: billingcompanypostalcode, country: billingcompanycountry,
  });
  const owningCompanyInfo = setCompanyFormInputs('owning', {
    name: owningcompanyname, email: owningcompanyemail, phone: owningcompanyphone,
    mobile: owningcompanymobile, address1: owningcompanyaddressline1, address2: owningcompanyaddressline2,
    city: owningcompanycity, postalcode: owningcompanypostalcode, country: owningcompanycountry,
  });
  const managementCompanyInfo = setCompanyFormInputs('management', {
    name: managementcompanyname, email: managementcompanyemail, phone: managementcompanyphone,
    mobile: managementcompanymobile, address1: managementcompanyaddressline1, address2: managementcompanyaddressline2,
    city: managementcompanycity, postalcode: managementcompanypostalcode, country: managementcompanycountry,
  });
  const dataGroups = [
    { array: yachtMetrics, label: 'Yacht Metrics', key: 'yachtMetrics'},
    { array: taxInfo, label: 'Tax Info', key: 'taxInfo' },
    { array: buildInfo, label: 'Build Info', key: 'buildInfo'},
    { array: billingCompanyInfo, label: 'Billing Company Info', key: 'billingCompany'},
    { array: owningCompanyInfo, label: 'Owning Company Info', key: 'owningCompany'},
    { array: managementCompanyInfo, label: 'Management Company Info', key: 'managementCompany'},
  ];

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
          <ExpansionPanel key={`${dataGroup.key}-${index}`}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <SectionTitle text={dataGroup.label} />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.panelContent}>
                <TextFieldList
                  list={dataGroup.array}
                  classname={classes.textField}
                  onChange={onChange}
                />
              </div>
          </ExpansionPanelDetails>
          </ExpansionPanel>
        ))
      }

      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.submitButton}
      >
        Register Yacht
      </Button>
    </form>
  );
}

export default withStyles(styles)(YachtForm);
