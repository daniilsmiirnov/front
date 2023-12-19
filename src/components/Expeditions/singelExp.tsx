// SingleExpedition.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Container, Card } from 'react-bootstrap';
import NavigationBar from "../Navbar/Navbar";

const SingleExpedition: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const expedition = useSelector((state: RootState) => {
    return state.expeditions.expeditions.find(exp => exp.ID_Expedition.toString() === id);
  });
  const getStatusText = (status: string): string => {
    switch (status) {
      case 'in':
        return 'Введён';
      case 'wo':
        return 'В работе';
      case 'en':
        return 'Завершён';
      case 'ca':
        return 'Отменён';
      case 'de':
        return 'Удалён';
      default:
        return 'Неизвестный статус';
    }
  };
  return (
    <>
      <NavigationBar />
      <Container fluid className="bg-secondary d-flex justify-content-center align-items-center py-4" style={{ minHeight: '100vh' }}>
        {expedition && (
          <Card className="w-50"> {/* Уменьшаем размер карточки */}
            <Card.Body className="text-center">
              <Card.Title>{expedition.Name_Exp}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">ID: {expedition.ID_Expedition}</Card.Subtitle>
              <Card.Text>
                <strong>Leader:</strong> {expedition.Leader}<br />
                <strong>Date Start:</strong> {expedition.DateStart}<br />
                <strong>Date End:</strong> {expedition.DateEnd}<br />
                <strong>Date Approving:</strong> {expedition.DateApproving}<br />
                <strong>Status:</strong> {getStatusText(expedition.Status)}<br /> {/* Используем функцию getStatusText */}
                <strong>Describe:</strong> {expedition.Describe}<br />
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default SingleExpedition;
