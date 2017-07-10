import React, {Component} from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {TITLE, DEPENDENCIES} from 'config';
import map from 'lodash/map';
import {Card, CardTitle, CardText} from 'material-ui/Card';

class Home extends Component {
  render() {
    return (
      <Row>
        <Col xs={10} sm={8} md={8} xsOffset={1} smOffset={2} mdOffset={2}>
          <Card>
            <CardTitle title={TITLE} subtitle="powered by"/>
            <CardText>
              <ul style={{marginTop: 0}}>
              {
                map(DEPENDENCIES, (v, k) => {
                  return (
                    <li key={k}><code>{k}</code> : <code>{v}</code></li>
                  );
                })
              }
              </ul>
            </CardText>
          </Card>
        </Col>
      </Row>
    );
  }
}

Home.displayName = 'Home';

export default Home;
