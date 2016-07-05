import React, {Component} from 'react';
import Toolbar from 'components/Toolbar';
import {Row, Col, Alert} from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    const {auth} = this.props;
    this.setState({loading: true});
    auth.onAuthStateChanged$()
      .subscribe(user => {
        if (user === null) {
          return auth.signInAnonymously();
        }
        this.setState({loading: false, user});
        this._online();
      }, err => {
        console.error(err);
        this.setState({loading: false, user: null});
      });
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
      return (
        <Row>
          <Col xs={10} sm={8} md={8} xsOffset={1} smOffset={2} mdOffset={2}>
            <Alert bsStyle="warning">
              <span className="Select-loading"/>
              &nbsp;&nbsp;
              <span>Loading...</span>
            </Alert>
          </Col>
        </Row>
      );
    }

    if (user === null) {
      return (
        <Row>
          <Col xs={10} sm={8} md={8} xsOffset={1} smOffset={2} mdOffset={2}>
            <Alert bsStyle="danger">로그인 중 오류 발생.</Alert>
          </Col>
        </Row>
      );
    }

    if (!loading && user !== null) {
      return children;
    }
  }

  render() {
    return (
      <div>
        <Toolbar/>
        <div className="container">{this._children()}</div>
        <br/>
      </div>
    );
  }
}

App.displayName = 'App';
App.childContextTypes = {
  db: React.PropTypes.object
};

export default App;
