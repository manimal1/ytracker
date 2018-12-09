import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Heading = (props) => {

  return (
    <Typography variant="h4" gutterBottom>
      {props.text}
    </Typography>
  )
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Heading;