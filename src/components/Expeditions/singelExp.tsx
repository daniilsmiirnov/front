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
  
  return (
    <>
      <NavigationBar />
      {/* <div className="bg-secondary" style={{ minHeight: '100vh' }}> */}
        <Container fluid className="bg-secondary py-4" style={{ minHeight: '100vh' }}>
          <h2>Информация об экспедиции #{id}</h2>
          {expedition && (
            <Card>
              <Card.Body>
                <Card.Title>{expedition.Name_Exp}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">ID: {expedition.ID_Expedition}</Card.Subtitle>
                <Card.Text>
                  <strong>Leader:</strong> {expedition.Leader}<br />
                  <strong>Date Start:</strong> {expedition.DateStart}<br />
                  <strong>Date End:</strong> {expedition.DateEnd}<br />
                  <strong>Date Approving:</strong> {expedition.DateApproving}<br />
                  <strong>Status:</strong> {expedition.Status}<br />
                  <strong>Describe:</strong> {expedition.Describe}<br />
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Container>
      {/* </div> */}
    </>
  );
};

export default SingleExpedition;
