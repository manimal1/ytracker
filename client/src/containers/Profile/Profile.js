import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from './actions';
import Spinner from '../../components/Spinner';

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading === true) {
      profileContent = <Spinner page />;
    } else if (Object.keys(profile).length > 0) {
      profileContent = <h1>Profile</h1>;
    } else {
      // user is logged in but does not have a profile
      profileContent = (
        <div>
          <p>Welcome {user.firstname}!</p>
          <p>You have not set up a profile. Please add some info</p>
        </div>
      );
    }

    return <div>{profileContent}</div>;
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getCurrentProfile },
)(Profile);
