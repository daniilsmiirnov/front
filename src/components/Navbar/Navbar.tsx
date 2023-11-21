// import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


const NavigationBar = () => {
    const user = useSelector((state: RootState) => state.user);
    console.log(user)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand style={{ marginLeft: '50px' }} href="/">Expedition</Navbar.Brand>
                <Nav className="mr-auto">
          {user.Is_Super === false && user.id === -1 && (
            <>
              <Nav.Link href="/">Главная</Nav.Link>
              <Nav.Link href="/Main/auth/">Войти</Nav.Link>
            </>
          )}
          {user.Is_Super === false && user.id !=-1 && (
            <>
              <Nav.Link href="/exp_us">Экспедиции</Nav.Link>
              <Nav.Link href="/">Главная</Nav.Link>
              <Nav.Link href="/logout">Выйти</Nav.Link>
              
            </>
          )}
          {user.Is_Super === true && (
            <>
              <Nav.Link href="/exp_mod">Все Экспедиции</Nav.Link>
              <Nav.Link href="/">Главная</Nav.Link>
              <Nav.Link href="/logout">Выйти</Nav.Link>
            </>
          )}
        </Nav>
            </Container>
        </Navbar>

    );
};

export default NavigationBar;