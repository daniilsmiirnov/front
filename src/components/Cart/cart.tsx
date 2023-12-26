import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
const Cart: React.FC = () => {
  const expedition = useSelector((state: RootState) => state.cart.expedition);
  const navigate = useNavigate();
  const handleExpeditionClick =async () => {
    if (expedition) {
      try {
        const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
        const token = jwtTokenCookie ? jwtTokenCookie.split('=')[1] : null;
        
        const response = await axios.get(`http://127.0.0.1:8000/expedition/${expedition.ID_Expedition}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
        } 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      navigate(`/expedition/${expedition.ID_Expedition}`);
    }
  };

  return (
    <Container>
      <h2>Экспедиции</h2>
      <Card bg="light" text="dark" border="white" style={{ marginBottom: '20px' }}>
        <Card.Body>
          {expedition ? (
            <>
              <Card.Title>{expedition.Name_Exp}</Card.Title>
              <Card.Text>Лидер: {expedition.Leader}</Card.Text>

                <Button variant="dark" onClick={handleExpeditionClick}>Перейти к оформлению</Button>

            </>
          ) : (
            <p>Корзина пуста</p>
          )}
        </Card.Body>
      </Card>
      {/* <Card bg="light" text="dark" border="white">
      <Card.Body>
          <h3>Добавленные объекты :</h3>
          {expedition && expedition.Objects.length > 0 ? (
            expedition.Objects.map((object) => ( // Итерация по массиву объектов expedition.Objects
              <Card key={object.ID_Object}>
                <Card.Body>
                  {object.Name_Obj}
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>Список объектов пуст</p>
          )}
        </Card.Body>
      </Card> */}
    </Container>
  );
};

export default Cart;
