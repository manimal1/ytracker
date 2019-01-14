import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { PageContext } from './PageContext';

const drawerWidth = 220;

const styles = theme => ({
  desktopWindow: {
    paddingLeft: `${drawerWidth + 16}px`,
    paddingRight: '16px',
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  mobileWindow: {
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingTop: '8px',
    paddingBottom: '72px',
  }
});

const PagePanelFrame = props => {
  const { classes } = props;
  
  return(
    <PageContext.Consumer>
      {({isMobile}) => 
        isMobile ? 
          <div className={classes.mobileWindow}>
            {props.children}
          </div> :
          <div className={classes.desktopWindow}>
            {props.children}
          </div>
      }
    </PageContext.Consumer>
  )
}

export default withStyles(styles)(PagePanelFrame);
