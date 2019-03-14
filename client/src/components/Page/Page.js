import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';
import PageDrawer from './PageDrawer';
import PageDrawerMobile from './PageDrawerMobile';
import { PageContext, PagePanel } from '.';

class Page extends Component {
  constructor(props) {
    super(props);

    // set and bind Context Provider function for use in its Consumer
    this.handlePanelSwitch = newPanel => {
      this.setState({
        activePanel: newPanel, // eslint-disable-line react/no-unused-state
      });
    };

    this.state = {
      isMobile: false,
      isDrawerOpen: false,
      selectedIndex: 0,
      menu: this.props.menu || [],
      activePanel: this.props.defaultPanel || '', // eslint-disable-line react/no-unused-state
      handlePanelSwitch: this.handlePanelSwitch, // eslint-disable-line react/no-unused-state
    };
  }

  // set childContext functions for use in PagePanel child components
  getChildContext() {
    return {
      /* eslint-disable react/no-unused-state */
      handlePanelSwitch: newPanel => this.setState({ activePanel: newPanel }),
      /* eslint-enable */
      setSelectedIndex: index => this.setState({ selectedIndex: index }),
      isMobile: this.state.isMobile,
    };
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
        isMobile: true,
      });
    } else {
      this.setState({
        isMobile: false,
      });
    }
  };

  handleMenuItemSelect = (e, index) => {
    this.setState({ selectedIndex: index });
  };

  toggleDrawer = isOpen => () => {
    this.setState({
      isDrawerOpen: isOpen,
    });
  };

  render() {
    const { isMobile, isDrawerOpen, selectedIndex, menu } = this.state;
    const toggleDrawer = this.toggleDrawer;

    return (
      <div>
        <PageContext.Provider value={this.state}>
          <NavBar {...{ toggleDrawer, isDrawerOpen }}>
            <PageDrawerMobile
              {...{
                menu,
                isDrawerOpen,
                selectedIndex,
                toggleDrawer,
                handleMenuItemSelect: this.handleMenuItemSelect,
              }}
            />
          </NavBar>
          {!isMobile && (
            <PageDrawer
              {...{
                menu,
                selectedIndex,
                handleMenuItemSelect: this.handleMenuItemSelect,
              }}
            />
          )}
          {menu.map((menuItem, index) => {
            return (
              <PagePanel key={index} isActive={menuItem.id}>
                {menuItem.component}
              </PagePanel>
            );
          })}
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
};

export default Page;
