import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import {
  toggleDrawer, showSnackbar, hideSnackbar
} from 'actions/app';
import {requestAuth} from 'actions/auth';
import AppToolbar from 'components/AppToolbar';
import AppDrawer from 'components/AppDrawer';
import AppSnackBar from 'components/AppSnackBar';
import LinearProgress from 'material-ui/LinearProgress';

export class App extends Component {

  componentDidMount() {
    const {requestAuth} = this.props;
    requestAuth();
  }

  _children() {
    const {children} = this.props;
    const {user} = this.props;

    if (user === null) {
      return;
    }

    return children;
  }

  _toggleDrawer() {
    const {toggleDrawer} = this.props;
    toggleDrawer();
  }

  _openSnackbar() {
    const {showSnackbar} = this.props;
    showSnackbar('Hello there?');
  }

  _closeSnackbar() {
    const {hideSnackbar} = this.props;
    hideSnackbar();
  }

  _loading() {
    const {muiTheme: {appBar: {height}}} = this.context;
    const {toolbar, loading} = this.props;
    if (loading) {
      const top = toolbar ? height : 0;
      return (
        <div style={{top, position: 'fixed', width: '100%'}}
          className="app-progress">
          <LinearProgress mode="indeterminate"/>
        </div>
      );
    }
  }

  render() {
    const {toolbar, drawerOpen, snackbar} = this.props;
    return (
      <div>
        <AppToolbar className={cn({hide: !toolbar})}
          onToggleDrawer={this._toggleDrawer.bind(this)}
          onOpenSnackbar={this._openSnackbar.bind(this)}/>
        {this._loading()}
        <AppDrawer open={drawerOpen} onToggle={this._toggleDrawer.bind(this)}/>
        <div className={cn({container: toolbar})}>
          {this._children()}
        </div>
        <AppSnackBar {...snackbar}
          onRequestClose={this._closeSnackbar.bind(this)}/>
        <br/>
      </div>
    );
  }
}

App.displayName = 'App';
App.contextTypes = {
  muiTheme: PropTypes.object
};
App.propTypes = {
  drawerOpen: PropTypes.bool,
  snackbar: PropTypes.object,
  requestAuth: PropTypes.func,
  toggleDrawer: PropTypes.func,
  showSnackbar: PropTypes.func,
  hideSnackbar: PropTypes.func,
  toolbar: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
  children: PropTypes.node
};
App.defaultProps = {
  drawerOpen: false
};

const mapStateToProps = state => {
  const {app, auth} = state;
  return {
    drawerOpen: Boolean(app.drawerOpen),
    loading: Boolean(app.progress),
    snackbar: app.snackbar,
    user: auth.user,
    toolbar: app.toolbar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestAuth: () => dispatch(requestAuth()),
    toggleDrawer: () => dispatch(toggleDrawer()),
    showSnackbar: (msg, props) => dispatch(showSnackbar(msg, props)),
    hideSnackbar: () => dispatch(hideSnackbar())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
