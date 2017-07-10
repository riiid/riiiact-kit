import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

const AppSnackbar = props => {
  return <Snackbar {...props}/>;
};

AppSnackbar.displayName = 'AppSnackBar';
AppSnackbar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string
};
AppSnackbar.defaultProps = {
  open: false,
  message: ''
};

export default AppSnackbar;
