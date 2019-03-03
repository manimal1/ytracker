import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import SectionTitle from './SectionTitle';
import Spinner from './Spinner';

const styles = theme => ({
  wrapper: {
    width: '100%',
  },
  pageWrapper: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
  },
  formControl: {
    minWidth: '110px',
    marginTop: '16px',
  },
});

function renderItemSelectorInput(props) {
  const {
    classes,
    label,
    inputPropsId,
    selectedValue,
    list,
    buttonText,
    onChangeEvent,
    buttonClickEvent,
    buttonLoading,
    required,
  } = props;

  return (
    <FormControl className={classes.formControl} fullWidth required={required}>
      <InputLabel htmlFor={inputPropsId}>{label}</InputLabel>
      <Select
        value={selectedValue}
        onChange={onChangeEvent}
        inputProps={{
          name: `${inputPropsId}`,
          id: `${inputPropsId}`,
        }}
      >
        {list.map(item => {
          return (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
      {buttonClickEvent && (
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={buttonClickEvent}
          className={classes.button}
          disabled={buttonLoading}
        >
          {buttonLoading && <Spinner />}
          {!buttonLoading && <span>{buttonText}</span>}
        </Button>
      )}
    </FormControl>
  );
}

function renderItemSelectorCard(props) {
  return (
    <Card>
      <CardContent>{renderItemSelectorInput(props)}</CardContent>
    </Card>
  );
}

const ItemSelector = props => {
  const { classes, sectionTitle, card } = props;

  return (
    <form className={card ? classes.pageWrapper : classes.wrapper}>
      {!!sectionTitle && <SectionTitle text={sectionTitle} />}
      {card && renderItemSelectorCard(props)}
      {!card && renderItemSelectorInput(props)}
    </form>
  );
};

export default withStyles(styles)(ItemSelector);
