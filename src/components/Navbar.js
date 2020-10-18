import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import { auth } from "../firebase";

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  let history = useHistory();

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Simple Inventory</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Category</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">Product</NavLink>
            </NavItem>
          </Nav>
          <NavbarText onClick = {() => {
                auth.signOut();
                localStorage.removeItem('user');
                history.push('/login')
              }}>Logout</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;