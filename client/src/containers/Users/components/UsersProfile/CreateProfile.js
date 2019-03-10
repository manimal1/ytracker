import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getCurrentProfile, createUserProfile } from 'actions/profileActions';
import Spinner from 'components/Spinner';
import { userProfile as profileModel } from 'utils/objectModels';
import ProfileForm from './ProfileForm';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    const { userProfile } = this.props;
    const hasUserProfile = userProfile && !userProfile.noprofile;
    const profile = hasUserProfile ? userProfile.profile : profileModel;

    this.state = {
      profile: profile,
      userRoles: [
        'Admin',
        'Yacht Agent',
        'Charter Agent',
        'Yacht Manager',
        'IT',
      ],
      errors: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }

    if (nextProps.userProfile !== prevState.userProfile) {
      return { userProfile: nextProps.userProfile };
    }

    return null;
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.state.errors) {
      this.setState({ errors: this.state.errors });
    }

    if (prevState.userProfile !== this.state.userProfile) {
      if (this.state.userProfile.profile) {
        return this.setState({
          profile: this.state.userProfile.profile,
          userProfile: this.state.userProfile,
        });
      }
      return this.setState({ userProfile: this.state.userProfile });
    }

    if (this.state.userProfile.isCreated) {
      this.context.handlePanelSwitch('users-todos');
      this.context.setSelectedIndex(0);
    }
  }

  componentWillUnmount() {
    this.props.getCurrentProfile();
  }

  onChange = e => {
    const name = e.target.name;
    const profile = { ...this.state.profile };
    profile[name] = e.target.value;

    this.setState({ profile });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUserProfile = this.state.profile;

    this.props.createUserProfile(newUserProfile);
  };

  render() {
    const { userProfile, profile } = this.state;
    const onChange = this.onChange;
    const onSubmit = this.onSubmit;
    const isDataFetching = userProfile && userProfile.isLoading === true;

    if (!userProfile || userProfile.isLoading === true || !profile) {
      return <Spinner page />;
    }

    return (
      <ProfileForm
        {...{
          ...this.state,
          onChange,
          onSubmit,
          isDataFetching,
        }}
      />
    );
  }
}

CreateProfile.propTypes = {
  userProfile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

CreateProfile.contextTypes = {
  handlePanelSwitch: PropTypes.func,
  setSelectedIndex: PropTypes.func,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
});

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    createUserProfile,
  },
)(CreateProfile);
