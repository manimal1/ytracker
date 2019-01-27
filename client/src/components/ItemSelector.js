import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import SectionTitle from './SectionTitle';

const styles = theme => ({
  wrapper: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '240px',
    },
  },
  formControl: {
    minWidth: '110px',
    marginTop: '16px',
    width: '100%',
  },
});

const ItemSelector = (props) => {
  const {
    classes,
    label,
    inputPropsId,
    selectedValue,
    list,
    buttonText,
    onChangeEvent,
    buttonClickEvent,
    sectionTitle
  } = props;
  
  return (
    <form className={classes.wrapper}>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            {!!sectionTitle &&
              <SectionTitle text={sectionTitle} />
            }
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor={inputPropsId}>{label}</InputLabel>
              <Select
                value={selectedValue}
                onChange={onChangeEvent}
                inputProps={{
                  name: `${inputPropsId}`,
                  id: `${inputPropsId}`,
                }}
              >
                {
                  list.map(item => {
                    console.log(item);
                    const name = item.name ? item.name : item.companyname;
                    return (
                    <MenuItem key={item._id} value={item._id}>{name}</MenuItem>
                  )})
                }
              </Select>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={buttonClickEvent}
                className={classes.button}
              >
                {buttonText}
              </Button>
            </FormControl>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}

ItemSelector.propTypes = {
  label: PropTypes.string,
  inputPropsId: PropTypes.string,
  list: PropTypes.array,
  buttonText: PropTypes.string,
  buttonClickEvent: PropTypes.func,
  sectionTitle: PropTypes.string
}

export default withStyles(styles)(ItemSelector);