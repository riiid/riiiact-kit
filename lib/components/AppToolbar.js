import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DescIcon from 'material-ui/svg-icons/action/description';
import ChartIcon from 'material-ui/svg-icons/editor/show-chart';
import ClassIcon from 'material-ui/svg-icons/action/class';
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';
import {TITLE} from 'config';

class AppToolbar extends Component {

  _route(index) {
    const {onOpenSnackbar} = this.props;
    const {router} = this.context;
    switch (index) {
      case 0:
      case 1:
      case 2:
        return router.push('menu');
      case 3:
        return onOpenSnackbar();
      case 100:
        return router.push('/');
      default:
        break;
    }
  }

  _menu() {
    return (
      <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
        <MenuItem primaryText="Menus" disabled={true} />
        <MenuItem primaryText="menu 1"
          leftIcon={<DescIcon/>}
          onTouchTap={this._route.bind(this, 0)}/>
        <MenuItem primaryText="menu 2"
          leftIcon={<ChartIcon/>}
          onTouchTap={this._route.bind(this, 1)}/>
        <MenuItem primaryText="menu 3"
          leftIcon={<ClassIcon/>}
          onTouchTap={this._route.bind(this, 2)}/>
        <MenuItem primaryText="show snackbar"
          leftIcon={<FeedbackIcon/>}
          onTouchTap={this._route.bind(this, 3)}/>
      </IconMenu>
    );
  }

  render() {
    const {className, onToggleDrawer} = this.props;
    return (
      <AppBar style={{position: 'fixed', top: 0, zIndex: 1101}}
        className={className}
        onLeftIconButtonTouchTap={onToggleDrawer}
        onTitleTouchTap={this._route.bind(this, 100)}
        iconElementRight={this._menu()}
        title={TITLE}
        titleStyle={{cursor: 'pointer'}}/>
    );
  }
}

AppToolbar.displayName = 'AppToolbar';
AppToolbar.contextTypes = {
  router: PropTypes.object.isRequired
};
AppToolbar.propTypes = {
  className: PropTypes.string,
  onToggleDrawer: PropTypes.func,
  onOpenSnackbar: PropTypes.func
};

export default AppToolbar;
