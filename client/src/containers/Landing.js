import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import desktopImg from '../img/bg-login.jpg';
import mobileImg from '../img/bg-login-mobile.jpg';

const styles = theme => ({
  desktopHeader: {
    backgroundImage: `url(${desktopImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  },
  mobileHeader: {
    backgroundImage: `url(${mobileImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  },
  imageWrapper: {
    position: 'relative',
  },
  gradient: {
    background: 'linear-gradient(90deg, rgba(72,188,250,0.40) 0%, rgba(73,105,242,0.40) 100%)',
    position: 'absolute',
    top: '0',
    bottom: '4px',
    left: '0',
    right: '0',
  },
  mobileImage: {
    maxWidth: '100%',
  },
  header: {
    position: 'absolute',
    top: '170px',
    left: '0',
    right: '0',
    marginLeft: '16px',
    marginRight: '16px',
  },
  title: {
    color: '#FFFFFF',
    display: 'block',
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
    margin: '24px',
    textAlign: 'center',
  },
  button: {
    width: '100px',
  }
});

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.checkViewportWidth);
    this.checkViewportWidth();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkViewportWidth);
  }

  checkViewportWidth = () => {
    if (window.innerWidth <= 768) {
      this.setState({
        isMobile: true
      });
    } else {
      this.setState({
        isMobile: false
      });
    }
  }

  render() {
    const { isMobile } = this.state;
    const { classes } = this.props;
    // const bgImage = isMobile ? mobileImg : desktopImg;
    const bgImageClass = isMobile ? classes.mobileHeader : classes.desktopHeader;

    return (
      <div>
        <div className={classes.imageWrapper}>
          <div className={bgImageClass} />
          <div className={classes.gradient} />
          <div className={classes.header}>
            <Typography variant="h2" gutterBottom className={classes.title}>
              Welcome to Yacht Tracker!
            </Typography>
            <div className={classes.buttons}>
              <Link to="/register" className={classes.link}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  Register
                </Button>
              </Link>
              <Link to="/login" className={classes.link}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Landing);
