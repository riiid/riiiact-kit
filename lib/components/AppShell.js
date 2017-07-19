import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestAuth} from 'actions/auth';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';

export class AppShell extends Component {
  _children() {
    const {children, firebaseAvailable} = this.props;

    if (!firebaseAvailable) {
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

  componentWillMount() {
    const {requestAuth} = this.props;
    requestAuth();
  }

  render() {
    return this._children();
  }
}

AppShell.displayName = 'AppShell';
AppShell.propTypes = {
  children: PropTypes.node,
  firebaseAvailable: PropTypes.bool,
  requestAuth: PropTypes.func
};

const mapStateToProps = ({app: {firebaseAvailable}}) => {
  return {firebaseAvailable};
};

const mapDispatchToProps = {
  requestAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(AppShell);
