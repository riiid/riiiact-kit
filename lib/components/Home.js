import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {DEPENDENCIES} from 'config';
import {map} from 'lodash';

const Home = () => {
  return (
    <Row>
      <Col className="card"
        xs={10} sm={8} md={8} xsOffset={1} smOffset={2} mdOffset={2}>
        <h4>riiiact-kit</h4>
        <p style={{color: '#bbb'}}>powered by</p>
        <ul>
        {
          map(DEPENDENCIES, (v, k) => {
            return (
              <li><code>{k}</code> : <code>{v}</code></li>
            );
          })
        }
        </ul>
      </Col>
    </Row>
  );
};

Home.displayName = 'Home';

export default Home;
