import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavBrand } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <NavBrand><Link to="/">ICD-10-CM Seeker</Link></NavBrand>
        <Nav right>
          <NavItem href="https://github.com/CasperLaiTW/ICD-10-CM-Seeker">GitHub</NavItem>
        </Nav>
      </Navbar>
    );
  }
}
