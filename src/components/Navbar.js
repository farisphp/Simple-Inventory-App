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
  NavbarText,
  Container
} from 'reactstrap';
import { auth } from "../firebase";

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  let history = useHistory();

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Container>
            <NavbarBrand href="/">Simple Inventory</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/category/">Category</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/product/">Product</NavLink>
                    </NavItem>
                </Nav>
                <NavbarText onClick = {() => {
                    auth.signOut();
                    localStorage.removeItem('user');
                    history.push('/login')
                }}>Logout</NavbarText>
            </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;