import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  toggleDrawer, showSnackbar, hideSnackbar
} from 'actions/app';
import {subscribeAuth} from 'actions/auth';
import AppToolbar from 'components/AppToolbar';
import AppDrawer from 'components/AppDrawer';
import AppSnackBar from 'components/AppSnackBar';
import LinearProgress from 'material-ui/LinearProgress';

class App extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(subscribeAuth());
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
    const {dispatch} = this.props;
    dispatch(toggleDrawer());
  }

  _openSnackbar() {
    const {dispatch} = this.props;
    dispatch(showSnackbar('Hello there?'));
  }

  _closeSnackbar() {
    const {dispatch} = this.props;
    dispatch(hideSnackbar());
  }

  _loading() {
    const {muiTheme: {appBar: {height}}} = this.context;
    const {loading} = this.props;
    if (loading) {
      return (
        <div className="app-progress" style={{marginTop: height}}>
          <LinearProgress mode="indeterminate"/>
        </div>
      );
    }
  }

  render() {
    const {drawerOpen, snackbar} = this.props;
    return (
      <div>
        <AppToolbar
          onToggleDrawer={this._toggleDrawer.bind(this)}
          onOpenSnackbar={this._openSnackbar.bind(this)}/>
        {this._loading()}
        <AppDrawer open={drawerOpen} onToggle={this._toggleDrawer.bind(this)}/>
        <div className="container">
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
  snackbar: PropTypes.object
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
    user: auth.user
  };
};

export default connect(mapStateToProps)(App);
