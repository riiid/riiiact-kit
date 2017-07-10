import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {spacing, typography} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';
import {VERSION, TARGET} from 'config';

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 16,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8
  }
};

class AppDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {open, onToggle} = this.props;
    return (
      <Drawer docked={false} open={open}
        onRequestChange={onToggle}>
        <div style={styles.logo}>
          v{VERSION}{TARGET === 'development' ? '-dev' : ''}
        </div>
        <MenuItem disabled={true}>user@email.com</MenuItem>
      </Drawer>
    );
  }
}

AppDrawer.displayName = 'AppDrawer';
AppDrawer.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func
};

export default AppDrawer;
