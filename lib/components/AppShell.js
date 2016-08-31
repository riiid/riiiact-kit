import React, {Component, PropTypes} from 'react';
import {firebase} from 'api';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';

class AppShell extends Component {

  getChildContext() {
    return {db: firebase.db, auth: firebase.auth};
  }

  _children() {
    const {children} = this.props;

    if (firebase.db === null || firebase.auth === null) {
      return (
        <div className="container">
          <Row>
            <Col xs={10} sm={8} md={8} xsOffset={1} smOffset={2} mdOffset={2}>
              <Alert bsStyle="danger">
                Cannot initialize <code>App</code>.
                Did you update <code>build/config.json</code> properly?
              </Alert>
            </Col>
          </Row>
        </div>
      );
    }

    return children;
  }

  render() {
    return this._children();
  }
}

AppShell.displayName = 'AppShell';
AppShell.childContextTypes = {
  db: PropTypes.object,
  auth: PropTypes.object
};

export default AppShell;
