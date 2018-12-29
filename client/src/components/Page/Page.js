import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { default as PageDrawer } from './PageDrawer';
import { default as PageDrawerMobile } from './PageDrawerMobile';

import { PageContext, PagePanel } from '.';

const styles = theme => ({
  menuIcon: {
    zIndex: theme.zIndex.drawer + 2,
    position: 'fixed',
    top: '8px',
    left: '0px',
    color: '#FFFFFF',
  },
});

class Page extends Component {
  constructor(props) {
    super(props);

    // set and bind Context Provider function for use in its Consumer
    this.handlePanelSwitch = newPanel => {
      this.setState({
        activePanel: newPanel
      });
    };

    this.state = {
      isMobile: false,
      isDrawerOpen: false,
      selectedIndex: 0,
      menu: this.props.menu || [],
      activePanel: this.props.defaultPanel || '',
      handlePanelSwitch: this.handlePanelSwitch,
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.checkViewportWidth);
    this.checkViewportWidth();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkViewportWidth);
  }

  // set childContext functions for use in PagePanel child components
  getChildContext() {
    return {
      handlePanelSwitch: newPanel => this.setState({ activePanel: newPanel }),
      setSelectedIndex: index => this.setState({ selectedIndex: index }),
    }
  };

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

  handleMenuItemSelect = (e, index) => {
    this.setState({selectedIndex: index});
  }

  toggleDrawer = (isOpen) => () => {
    this.setState({
      isDrawerOpen: isOpen
    });
  }

  render() {
    const { isMobile, isDrawerOpen, selectedIndex, menu } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <PageContext.Provider
          value={this.state}
        >
          {!isMobile &&
            <PageDrawer {...{
              menu,
              selectedIndex,
              handleMenuItemSelect: this.handleMenuItemSelect,
            }} />
          }
          {isMobile &&
            <React.Fragment>
              <IconButton
                className={classes.menuIcon}
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleDrawer(!isDrawerOpen)}
              >
                <MenuIcon/>
              </IconButton>
              <PageDrawerMobile {...{
                menu,
                isDrawerOpen,
                selectedIndex,
                toggleDrawer: this.toggleDrawer,
                handleMenuItemSelect: this.handleMenuItemSelect,
              }} />
            </React.Fragment>
          }
          {
            menu.map((menuItem, index) => {
              return (
                <PagePanel key ={index} isActive={menuItem.id}>
                  {menuItem.component}
                </PagePanel>
              )
            })
          }
        </PageContext.Provider>
      </div>
    );
  }
}

// set context items for use in child components
Page.childContextTypes = {
  handlePanelSwitch: PropTypes.func,
  setSelectedIndex: PropTypes.func,
  isMobile: PropTypes.bool,
}

export default withStyles(styles)(Page);