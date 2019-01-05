import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import SectionTitle from '../../components/SectionTitle';

import {
  getAllYachts,
  getYachtById,
  clearSelectedYacht,
} from './actions';

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
  card: {
    marginTop: '8px',
    marginBottom: '8px',
  },
  formControl: {
    minWidth: '110px',
    marginTop: '16px',
    width: '100%',
  },
  button: {
    marginTop: '16px',
    marginBottom: '16px',
  }
});

class YachtSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedYacht: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedYacht !== this.state.selectedYacht) {
      this.props.getYachtById(this.state.selectedYacht);
    }
  }

  componentDidMount() {
    if (!this.props.yachtData.yachts
      || this.props.yachtData.yachts.length === 0) {
      this.props.getAllYachts();
    }
  }

  componentWillUnmount() {
    this.props.clearSelectedYacht();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { selectedYacht } = this.state;
    const { 
      classes,
      sectionTitle,
      setIsYachtSelected, // function that sets parent-component boolean for whether a yacht is selected
    } = this.props;
    const onChange = this.onChange;
    const yachts = this.props.yachtData.yachts || '';

    return (
      <form className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.card}>
            <CardContent>
              {!!sectionTitle &&
                <SectionTitle text={sectionTitle} />
              }
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="selectedYacht">Existing Yachts</InputLabel>
                <Select
                  value={selectedYacht}
                  onChange={onChange}
                  inputProps={{
                    name: 'selectedYacht',
                    id: 'selectedYacht',
                  }}
                >
                  {
                    yachts.map(yacht => (
                      <MenuItem key={yacht._id} value={yacht._id}>{yacht.name}</MenuItem>
                    ))
                  }
                </Select>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={setIsYachtSelected}
                  className={classes.button}
                >
                  Select Yacht
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </div>
      </form>
    )
  }
}

YachtSelector.propTypes = {
  getAllYachts: PropTypes.func.isRequired,
  getYachtById: PropTypes.func.isRequired,
  clearSelectedYacht: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  yachtData: state.yachtData,
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {
      getAllYachts,
      getYachtById,
      clearSelectedYacht,
    },
  )
)(YachtSelector);