import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ExpeditionCard from './exp_card'; // Ensure the correct import path for ExpeditionCard component
import { RootState } from '../../store/store'; // Update the path to your RootState
import NavigationBar from "../Navbar/Navbar";

const ExpHistory: React.FC = () => {
  const userExpeditions = useSelector((state: RootState) => state.expeditions.expeditions);

  return (
    <>
    <NavigationBar />
    <Container fluid className="bg-secondary text-center py-4">
      <h1>История Экспедиций</h1>
      {userExpeditions.length > 0 ? (
        <Row className="justify-content-center">
          {userExpeditions.map((expedition) => (
            <Col key={expedition.ID_Expedition} sm={6} md={4} lg={3} className="mb-3">
              <ExpeditionCard expedition={expedition} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="mt-3">
          История пуста
        </Alert>
      )}
    </Container>
    </>
  );
};

export default ExpHistory;
