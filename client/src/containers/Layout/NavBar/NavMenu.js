import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Home from '@material-ui/icons/Home';
import BoatIcon from '@material-ui/icons/DirectionsBoat';
import PersonIcon from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';
import StoreIcon from '@material-ui/icons/Store';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import Work from '@material-ui/icons/Work';
import ListAlt from '@material-ui/icons/ListAlt';
// import RowingIcon from '@material-ui/icons/Rowing';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import InboxIcon from '@material-ui/icons/Inbox';
// import DraftsIcon from '@material-ui/icons/Drafts';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 240,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NavMenu extends Component {
  state = {
    yachtsIsOpen: true,
    usersIsOpen: true,
    companyIsOpen: true,
  };

  handleClick = item => {
    if (item === 'yachtsIsOpen') {
      return this.setState({ yachtsIsOpen: !this.state.yachtsIsOpen });
    }
    if (item === 'usersIsOpen') {
      return this.setState({ usersIsOpen: !this.state.usersIsOpen });
    }
    if (item === 'companyIsOpen') {
      return this.setState({ companyIsOpen: !this.state.companyIsOpen });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <List component="nav" className={classes.root}>
        <ListItem button onClick={() => this.handleClick('yachtsIsOpen')}>
          <ListItemIcon>
            <BoatIcon />
          </ListItemIcon>
          <ListItemText inset primary="Yachts" />
          {this.state.yachtsIsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.yachtsIsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to={'/yachts'}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText inset primary="Yachts Home" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to={'/yachts/add'}
            >
              <ListItemIcon>
                <LibraryAdd />
              </ListItemIcon>
              <ListItemText inset primary="Add Yacht" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to={'/yachts/service'}
            >
              <ListItemIcon>
                <Work />
              </ListItemIcon>
              <ListItemText inset primary="Add Service" />
            </ListItem>
          </List>
        </Collapse>
        <Divider />

        <ListItem button onClick={() => this.handleClick('usersIsOpen')}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText inset primary="Users" />
          {this.state.usersIsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.usersIsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to={'/users'}
            >
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText inset primary="Todos" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to={'/users/profile'}
            >
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText inset primary="Profile" />
            </ListItem>
          </List>
        </Collapse>
        <Divider />

        <ListItem button onClick={() => this.handleClick('companyIsOpen')}>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText inset primary="Companies" />
          {this.state.companyIsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.companyIsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              component={Link}
              to={'/company'}
            >
              <ListItemIcon>
                <LibraryAdd />
              </ListItemIcon>
              <ListItemText inset primary="Add Company" />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
      </List>
    );
  }
}

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(withRouter(NavMenu));
