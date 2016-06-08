import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {VERSION} from 'config';

class Toolbar extends Component {

  componentDidMount() {
    this.btn = document.querySelector('#toolbar .navbar-toggle');
  }

  _close() {
    const style = window.getComputedStyle(this.btn);
    if (style.display === 'block') {
      this.btn.click();
    }
  }

  render() {
    const {router} = this.context;
    const {Header, Brand, Toggle, Collapse} = Navbar;
    return (
      <Navbar id="toolbar" fixedTop={true}>
        <Header>
          <Brand>riiiact-kit</Brand>
          <Toggle/>
        </Header>
        <Collapse>
          <Nav>
            <NavItem onSelect={() => {
              this._close();
              router.push('/');
            }}>v{VERSION}</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem onSelect={() => {
              this._close();
              router.push('menu');
            }}>Menu 1</NavItem>
            <NavItem onSelect={() => {
              this._close();
              router.push('menu');
            }}>Menu 2</NavItem>
            <NavItem onSelect={() => {
              this._close();
              router.push('menu');
            }}>Menu 3</NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

Toolbar.displayName = 'Toolbar';
Toolbar.contextTypes = {
  router: React.PropTypes.object
};

export default Toolbar;
