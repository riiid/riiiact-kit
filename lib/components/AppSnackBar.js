import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const AppSnackbar = props => {
  return <Snackbar {...props}/>;
};

AppSnackbar.displayName = 'AppSnackBar';
AppSnackbar.propTypes = {
  open: React.PropTypes.bool,
  message: React.PropTypes.string
};
AppSnackbar.defaultProps = {
  open: false,
  message: ''
};

export default AppSnackbar;
