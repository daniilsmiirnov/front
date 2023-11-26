import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const expedition = useSelector((state: RootState) => state.cart.expedition);

  return (
    <Container>
      <h2>Экспедиции</h2>
      <Card bg="light" text="dark" border="white" style={{ marginBottom: '20px' }}>
        <Card.Body>
          {expedition ? (
            <>
              <Card.Title>{expedition.Name_Exp}</Card.Title>
              <Card.Text>Лидер: {expedition.Leader}</Card.Text>
              <Link to="/expeditions/"> {/* Использование компонента Link */}
                <Button variant="dark">Перейти к оформлению</Button>
              </Link>
            </>
          ) : (
            <p>Корзина пуста</p>
          )}
        </Card.Body>
      </Card>
      <Card bg="light" text="dark" border="white">
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
      </Card>
    </Container>
  );
};

export default Cart;
