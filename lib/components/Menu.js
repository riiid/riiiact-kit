import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Observable} from 'rx';
import {keys} from 'lodash';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalViews: 0,
      currentViews: 0
    };
  }

  componentDidMount() {
    console.log('mount?');
    this._count();
    this._views();
  }

  _count() {
    const {db} = this.context;
    db.ref('stats').child('totalViews').transaction$(current => {
      if (current === null) {
        return 1;
      }
      return current + 1;
    })
    .subscribe(() => {
    }, err => {
      console.error(err);
    });
  }

  _views() {
    const {db} = this.context;
    const tv$ = db.ref('stats').child('totalViews').observe$('value')
      .map(snapshot => snapshot.val());
    const cv$ = db.ref('online-users').observe$('value')
      .map(snapshot => snapshot.val());

    this.viewsSubs = Observable.combineLatest(tv$, cv$, (tv, cv) => {
      return {
        totalViews: tv,
        currentViews: keys(cv).length
      };
    })
    .subscribe(result => this.setState(result));
  }

  componentWillUnmount() {
    this.viewsSubs.dispose();
  }

  render() {
    const {totalViews, currentViews} = this.state;
    return (
      <Row>
        <Col className="card"
          xs={10} sm={8} md={8} xsOffset={1} smOffset={2} mdOffset={2}>
          <div className="clearfix">
            <h4 className="pull-left">Hello, Folks</h4>
            <div className="pull-right">
              <span>{totalViews} Views</span>,
              &nbsp;&nbsp;
              <span>{currentViews} Current</span>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

Menu.displayName = 'Menu';
Menu.contextTypes = {
  router: React.PropTypes.object,
  db: React.PropTypes.object
};

export default Menu;
