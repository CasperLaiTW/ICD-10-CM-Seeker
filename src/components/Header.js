import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar brand={<Link to="/">ICD-10-CM Seeker</Link>}>
      </Navbar>
    );
  }
}
