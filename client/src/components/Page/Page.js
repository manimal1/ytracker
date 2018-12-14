import React, { Component } from 'react';

import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { default as PageDrawer } from './PageDrawer';
import { default as MobileDrawer } from '../MobileDrawer';

import { PageContext, PagePanel } from '.';

const styles = theme => ({
  menuIcon: {
    zIndex: theme.zIndex.drawer + 2,
    position: 'absolute',
    top: '8px',
    left: '0px',
    color: '#FFFFFF',
  },
});

class Page extends Component {
  constructor(props) {
    super(props);

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
      activePanel: '',
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
              <MobileDrawer {...{
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
                <PagePanel key ={index} isActive={menuItem.label}>
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

export default withStyles(styles)(Page);