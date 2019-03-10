import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from 'actions/userRegisterActions';
import Register from './Register';

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }

    return null;
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/yachts');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.state.errors) {
      this.setState({ errors: this.state.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const {
      firstname,
      lastname,
      email,
      password,
      password2,
      errors,
    } = this.state;
    const onChange = this.onChange;
    const onSubmit = this.onSubmit;

    return (
      <Register
        {...{
          firstname,
          lastname,
          email,
          password,
          password2,
          onChange,
          onSubmit,
          errors,
        }}
      />
    );
  }
}

RegisterUser.propTypes = {
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { registerUser },
)(withRouter(RegisterUser));
