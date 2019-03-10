import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ItemSelector from 'components/ItemSelector';

import {
  getAllYachts,
  getYachtById,
  clearYachts,
  clearSelectedYacht,
} from 'actions/yachtActions';

class YachtSelector extends Component {
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
    const { yachtData } = this.props; // eslint-disable-rule no-shadow
    if (!yachtData.yachts || yachtData.yachts.length === 0) {
      this.props.getAllYachts();
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
    this.props.clearYachts();
    this.props.clearSelectedYacht();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetYachtDataState(yachtData) {
    return this.setState({ yachtData });
  }

  render() {
    const { selectedYacht, yachtData } = this.state;
    const {
      card,
      sectionTitle,
      label,
      setIsYachtSelected, // function that sets parent-component boolean for whether a yacht is selected
    } = this.props;
    const { onChange } = this;
    const { yachts } = yachtData || [];
    const { isLoading } = yachtData;

    return (
      <ItemSelector
        required
        label={label}
        inputPropsId="selectedYacht"
        selectedValue={selectedYacht}
        list={yachts}
        onChangeEvent={onChange}
        buttonText="Select Yacht"
        buttonClickEvent={setIsYachtSelected}
        buttonLoading={isLoading}
        sectionTitle={sectionTitle}
        card={card}
      />
    );
  }
}

YachtSelector.propTypes = {
  getAllYachts: PropTypes.func.isRequired,
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
      getAllYachts,
      getYachtById,
      clearYachts,
      clearSelectedYacht,
    },
  ),
)(YachtSelector);
