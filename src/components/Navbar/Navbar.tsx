// import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { logout } from '../../store/UserSlice';
import { removeFromCart } from '../../store/CartSlice';
import { Link } from 'react-router-dom';
import { resetFilters } from '../../store/FilterObjSlice';
import { clearExpeditionFilter } from '../../store/FilterExpSlice';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        dispatch(logout());
        dispatch(removeFromCart());
        dispatch(resetFilters());
        dispatch(clearExpeditionFilter());

        try {
          const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
          if (jwtTokenCookie) {
            const token = jwtTokenCookie.split('=')[1];
            
            const response = await axios.post(
              `http://127.0.0.1:8000/auth/logout/`,
              {},
              {
                withCredentials: true,
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
      
            console.log(response);
            document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            navigate('/');
          } 

          // await axios.post('http://127.0.0.1:8000/auth/logout/');
        } 
        catch (error) {
          console.error('Ошибка выхода:', error);
        }
      };
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand style={{ marginLeft: '50px' }} as={Link} to="/">Экспедиции</Navbar.Brand>
                <Nav className="mr-auto">
          {user.Is_Super === false && user.id === -1 && (
            <>
              <Nav.Link as={Link} to="/">Главная</Nav.Link>
              <Nav.Link as={Link} to="/auth/">Войти</Nav.Link>
            </>
          )}
          {user.Is_Super === false && user.id !=-1 && (
            <>
              <Nav.Link as={Link} to="/expedition_history/">Экспедиции</Nav.Link>
              <Nav.Link as={Link} to="/">Главная</Nav.Link>
              <Nav.Link onClick={handleLogout}>Выйти</Nav.Link>
              
            </>
          )}
          {user.Is_Super === true && (
            <>
              <Nav.Link as={Link} to="/object_list/">Таблица Объектов</Nav.Link>
              <Nav.Link as={Link} to="/expedition_history/">Все Экспедиции</Nav.Link>
              <Nav.Link as={Link} to="/">Главная</Nav.Link>
              <Nav.Link onClick={handleLogout}>Выйти</Nav.Link>
            </>
          )}
        </Nav>
            </Container>
        </Navbar>

    );
};

export default NavigationBar;