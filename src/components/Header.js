import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar brand={<Link to="/">ICD-10-CM Seeker</Link>}>
        <Nav right>
          <NavItem href="https://github.com/CasperLaiTW/ICD-10-CM-Seeker">GitHub</NavItem>
        </Nav>
      </Navbar>
    );
  }
}
