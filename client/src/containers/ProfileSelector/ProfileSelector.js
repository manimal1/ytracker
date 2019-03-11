import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ItemSelector from 'components/ItemSelector';

import {
  getAllProfiles,
  getProfileById,
  clearSelectedProfile,
} from 'actions/profileActions';

class ProfileSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfile: {},
      selectedProfile: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userProfile !== prevState.userProfile) {
      return { userProfile: nextProps.userProfile };
    }
    return null;
  }

  componentDidMount() {
    const { userProfile } = this.props; // eslint-disable-rule no-shadow
    if (!userProfile.allProfiles || userProfile.allProfiles.length === 0) {
      this.props.getAllProfiles();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedProfile, userProfile } = this.state;

    if (prevState.selectedProfile !== selectedProfile) {
      this.props.getProfileById(selectedProfile);
    }
    if (prevState.userProfile !== userProfile) {
      this.resetUserProfileState(userProfile);
    }
  }

  // componentWillUnmount() {
  //   this.props.clearSelectedProfile();
  // }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetUserProfileState(userProfile) {
    return this.setState({ userProfile });
  }

  render() {
    const { selectedProfile, userProfile } = this.state;
    const {
      card,
      sectionTitle,
      label,
      setIsProfileSelected, // function that sets parent-component boolean for whether a profile is selected
    } = this.props;
    const { onChange } = this;
    const profiles = userProfile.allProfiles;
    const { isLoading } = userProfile;

    return (
      <ItemSelector
        required
        label={label}
        inputPropsId="selectedProfile"
        selectedValue={selectedProfile}
        list={profiles}
        onChangeEvent={onChange}
        buttonText="Select Profile"
        buttonClickEvent={setIsProfileSelected}
        buttonLoading={isLoading}
        sectionTitle={sectionTitle}
        card={card ? card : false}
      />
    );
  }
}

ProfileSelector.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  clearSelectedProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  userProfile: state.userProfile,
});

export default compose(
  connect(
    mapStateToProps,
    {
      getAllProfiles,
      getProfileById,
      clearSelectedProfile,
    },
  ),
)(ProfileSelector);
