import React, {Component, cloneElement} from 'react';
import {create} from 'api';
import {Row, Col, Alert} from 'react-bootstrap';

class AppShell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      api: null
    };
  }

  componentDidMount() {
    const {firebase} = create();
    if (firebase === null) {
      this.setState({initialized: true});
    } else {
      this.setState({
        initialized: true,
        api: {
          db: firebase.database(),
          auth: firebase.auth()
        }
      });
    }
  }

  _children() {
    const {children} = this.props;
    const {initialized, api} = this.state;

    if (initialized && api) {
      return children && cloneElement(children, {...api});
    }

    if (initialized && api === null) {
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

    return <div></div>;
  }

  render() {
    return this._children();
  }
}

AppShell.displayName = 'AppShell';

export default AppShell;
