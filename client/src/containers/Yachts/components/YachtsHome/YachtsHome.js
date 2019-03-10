import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';

import YachtCard from 'components/YachtCard';

import {
  getAllActiveYachts,
  getYachtById,
  clearYachts,
  clearSelectedYacht,
} from 'actions/yachtActions';

class YachtsHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      yachtData: {},
      selectedYacht: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.yachtData !== prevState.yachtData) {
      return { yachtData: nextProps.yachtData };
    }
    return null;
  }

  componentDidMount() {
    const { yachtData, getAllActiveYachts } = this.props;
    if (!yachtData.activeYachts || yachtData.activeYachts.length === 0) {
      getAllActiveYachts();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedYacht, yachtData } = this.state;

    if (prevState.selectedYacht !== selectedYacht) {
      this.props.getYachtById(selectedYacht);
    }
    if (prevState.yachtData !== yachtData) {
      this.resetYachtDataState(yachtData);
    }
  }

  componentWillUnmount() {
    this.props.clearSelectedYacht();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetYachtDataState(yachtData) {
    return this.setState({ yachtData });
  }

  render() {
    const { selectedYacht, yachtData } = this.state; // eslint-disable-line no-unused-vars
    const { onChange } = this; // eslint-disable-line no-unused-vars
    const { activeYachts } = yachtData || [];
    const { isLoading } = yachtData; // eslint-disable-line no-unused-vars

    return (
      <div>
        <h3>Yachts Home!</h3>
        <Grid container spacing={24} justify="flex-start" alignItems="stretch">
          {activeYachts &&
            activeYachts.map(yacht => (
              <Grid key={yacht._id} item xs={12} md={4} lg={3}>
                <YachtCard yacht={yacht} />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}

YachtsHome.propTypes = {
  getAllActiveYachts: PropTypes.func.isRequired,
  getYachtById: PropTypes.func.isRequired,
  clearSelectedYacht: PropTypes.func.isRequired,
  clearYachts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  yachtData: state.yachtData,
});

export default compose(
  connect(
    mapStateToProps,
    {
      getAllActiveYachts,
      getYachtById,
      clearYachts,
      clearSelectedYacht,
    },
  ),
)(YachtsHome);
