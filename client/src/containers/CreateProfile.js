import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userProfile from 'utils/objectModels';

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: userProfile,
      currentProfile: this.props.profile,
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newProfile = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.createProfile(newProfile);
  };

  render() {
    // const { errors } = this.state;
    const { profile, currentProfile } = this.state;
    console.log({ profile }, { currentProfile }); // eslint-disable-line no-console
    return <div>Create Profile Page</div>;
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {},
)(CreateProfile);
