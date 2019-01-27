import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ItemSelector from '../../components/ItemSelector';

import {
  getAllYachts,
  getYachtById,
  clearYachts,
  clearSelectedYacht,
} from './actions';

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
    this.props.clearYachts();
    this.props.clearSelectedYacht();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { selectedYacht } = this.state;
    const { 
      sectionTitle,
      setIsYachtSelected, // function that sets parent-component boolean for whether a yacht is selected
    } = this.props;
    const onChange = this.onChange;
    const yachts = this.props.yachtData.yachts || '';

    return (
      <ItemSelector
        label={'Existing Yachts'}
        inputPropsId={'selectedYacht'}
        selectedValue={selectedYacht}
        list={yachts}
        buttonText={'Select Yacht'}
        onChangeEvent={onChange}
        buttonClickEvent={setIsYachtSelected}
        sectionTitle={sectionTitle}
      />
    )
  }
}

YachtSelector.propTypes = {
  getAllYachts: PropTypes.func.isRequired,
  getYachtById: PropTypes.func.isRequired,
  clearSelectedYacht: PropTypes.func.isRequired,
  clearYachts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
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
  )
)(YachtSelector);
