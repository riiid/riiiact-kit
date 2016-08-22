import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {requestMenu} from 'actions/menu';

class Menu extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(requestMenu());
  }

  render() {
    const {totalViews, currentViews} = this.props;
    return (
      <Row>
        <Col xs={10} sm={8} md={8} xsOffset={1} smOffset={2} mdOffset={2}>
          <Card>
            <CardTitle title="Hello, Folks"
              subtitle={`${totalViews} Views, ${currentViews} Current`}/>
            <CardText>
            </CardText>
          </Card>
        </Col>
      </Row>
    );
  }
}

Menu.displayName = 'Menu';
Menu.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = state => {
  const {menu} = state;
  return {...menu.count};
};

export default connect(mapStateToProps)(Menu);
