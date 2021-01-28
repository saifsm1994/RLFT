import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import '../Universal.css'
import {
  Route,
  NavLink,
  HashRouter,
  Switch,
  BrowserRouter
} from "react-router-dom";

import Lookup from '../Lookup'

const Navbar1 = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand >
        {props.Home ? props.Home : "Home"}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Lookup Tools
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                style={{border: "black 1px solid"}}>
                {props.lookupLink && props.lookupLink}
                </DropdownItem>
                <DropdownItem >
                {props.HCPC && props.HCPC}
                </DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Formatters
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                {props.Policies && props.Policies}
                </DropdownItem>
                <DropdownItem >
                {props.MasterPA && props.MasterPA}
                </DropdownItem>
                <DropdownItem>
                  {props.GSheet && props.GSheet}
                  </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

          </Nav>
          {props.reset && <Button color="danger" size="sm" onClick={() => props.reset()} className="resetButton">Reset</Button>}
          <NavbarText>By Saif</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navbar1;