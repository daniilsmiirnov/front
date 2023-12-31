// import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand style={{ marginLeft: '50px' }} href="/">Expedition</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="">About</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

    );
};

export default NavigationBar;