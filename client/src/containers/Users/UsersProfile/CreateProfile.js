import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
      redirectToSectionHome: false,
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
      this.setState({ redirectToSectionHome: true });
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
    const { userProfile, profile, redirectToSectionHome } = this.state;
    if (redirectToSectionHome) return <Redirect to={'/users'} />;
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
