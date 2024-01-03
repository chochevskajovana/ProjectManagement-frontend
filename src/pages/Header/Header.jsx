import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../../App.css";

const Header = (props) => {

    return (

        <header className="header sticky-top">
            <Navbar collapseOnSelect expand="lg"
                    className="navbar navbar-expand-lg bg-color py-3 py-lg-0 px-lg-5">
                <div className="container-fluid d-flex p-2">
                    <h3 className="heading me-4 text-white"><i>Project system management</i></h3>
                    <div className={"ms-auto"}>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="justify-content-center me-auto mb-2 mb-lg-0">
                                <Nav.Link as={Link} to="/projects">
                                    <div className="d-flex text-white">
                                        <span className="me-3">Projects</span>
                                    </div>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/employees">
                                    <div className="d-flex text-white">
                                        <span className="me-3">Employees</span>
                                    </div>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/teams">
                                    <div className="d-flex text-white">
                                        <span className="me-3">Teams</span>
                                    </div>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/reports">
                                    <div className="d-flex text-white">
                                        <span className="me-3">Reports</span>
                                    </div>
                                </Nav.Link>
                            </Nav>

                        </Navbar.Collapse>
                    </div>
                </div>
            </Navbar>
        </header>
    );
}

export default Header;
