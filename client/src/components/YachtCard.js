import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import pink from '@material-ui/core/colors/pink';

const styles = theme => ({
  yachtCard: {
    position: 'relative',
  },
  avatar: {
    color: '#fff',
    backgroundColor: pink[500],
  },
});

const YachtCard = props => {
  const { classes, yacht } = props;

  return (
    <Card className={classes.YachtCard}>
      <CardHeader
        avatar={
          <Avatar aria-label="Yacht" className={classes.avatar}>
            {yacht.name.slice(0, 1)}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={yacht.name}
        subheader={yacht.email}
      />
    </Card>
  );
};

export default withStyles(styles)(YachtCard);
