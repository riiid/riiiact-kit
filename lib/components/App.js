import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  toggleDrawer, showSnackbar, hideSnackbar, showProgress, hideProgress
} from 'actions/app';
import AppToolbar from 'components/AppToolbar';
import AppDrawer from 'components/AppDrawer';
import AppSnackBar from 'components/AppSnackBar';
import LinearProgress from 'material-ui/LinearProgress';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      drawerOpen: props.drawerOpen
    };
  }

  componentDidMount() {
    const {auth, dispatch} = this.props;
    const {muiTheme: {palette}} = this.context;
    dispatch(showProgress());
    auth.onAuthStateChanged$()
      .subscribe(user => {
        if (user === null) {
          return auth.signInAnonymously();
        }
        this.setState({user});
        dispatch(hideProgress());
        this._online();
      }, err => {
        console.error(err);
        dispatch(hideProgress());
        dispatch(showSnackbar('로그인 중 오류 발생', {
          bodyStyle: {backgroundColor: palette.accent1Color}
        }));
        this.setState({user: null});
      });
  }

  componentWillReceiveProps(nextProps) {
    const {drawerOpen, snackbar, loading} = nextProps;
    this.setState({drawerOpen, snackbar, loading});
  }

  getChildContext() {
    const {db} = this.props;
    return {db};
  }

  _online() {
    const {db} = this.props;
    const {user} = this.state;
    db.ref('online-users').child(user.uid).set(true);
    db.ref('online-users').child(user.uid).onDisconnect().set(null);
  }

  _children() {
    const {children} = this.props;
    const {user, loading} = this.state;

    if (loading) {
      return;
    }

    if (user === null) {
      return;
    }

    if (!loading && user !== null) {
      return children;
    }
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
    const {loading} = this.state;
    if (loading) {
      return (
        <div style={{marginTop: 64}}>
          <LinearProgress mode="indeterminate"/>
        </div>
      );
    }
  }

  render() {
    const {drawerOpen, snackbar} = this.state;
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
App.childContextTypes = {
  db: React.PropTypes.object
};
App.contextTypes = {
  muiTheme: React.PropTypes.object
};
App.propTypes = {
  drawerOpen: React.PropTypes.bool,
  snackbar: React.PropTypes.object
};
App.defaultProps = {
  drawerOpen: false
};

const mapStateToProps = state => {
  const {app} = state;
  return {
    drawerOpen: Boolean(app.drawerOpen),
    loading: Boolean(app.progress),
    snackbar: app.snackbar
  };
};

export default connect(mapStateToProps)(App);
