import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from './Login';
import { loginUser } from './actions';

class LoginUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      authenticated: false,
      errors: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      return { authenticated: true };
    }

    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }

    return null;
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.authenticated === true) {
      this.props.history.push('/dashboard');
    }

    if (prevState.errors !== this.state.errors) {
      this.setState({ errors: this.state.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { email, password, showPassword, errors } = this.state;
    const onChange = this.onChange;
    const onSubmit = this.onSubmit;
    const handleClickShowPassword = this.handleClickShowPassword;

    return (
      <Login
        {...{
          email,
          password,
          onChange,
          onSubmit,
          showPassword,
          handleClickShowPassword,
          errors,
        }}
      />
    );
  }
}

LoginUser.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { loginUser },
)(LoginUser);
