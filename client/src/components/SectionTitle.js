import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const SectionTitle = props => {
  return (
    <Typography variant="h6" className={props.class}>
      {props.text}
    </Typography>
  );
};

SectionTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SectionTitle;
