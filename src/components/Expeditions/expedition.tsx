import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Container, Row, Col } from 'react-bootstrap';
import ExpeditionCard from './exp_card'; 
import NavigationBar from "../Navbar/Navbar";

interface ObjectInt {
  ID_Object: number;
  Name_Obj: string;
  Region: string;
  Year: number;
  Opener: string;
  Status: string;
  Image_Url: string;
}

interface Expedition {
  ID_Expedition: number;
  Name_Exp: string;
  DateStart: string;
  DateEnd: string | null;
  DateApproving: string | null;
  Status: string;
  Leader: string;
  ModeratorId: number | null;
  CreatorId: number | null;
  Describe: string | null;
  Objects: ObjectInt[];
  Archive: string | null;
}

const Expeditions: React.FC = () => {
  const expedition = useSelector((state: RootState) => state.cart.expedition);
  const userExpeditions = useSelector((state: RootState) => state.expeditions.expeditions);

  return (
    <>
    <NavigationBar />
    <Container fluid className="bg-secondary" style={{ minHeight: '100vh' }}>
      {expedition ? (
        <>

          <Row>
            <Col>Название: {expedition.Name_Exp}</Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col>Корзина пуста</Col>
        </Row>
      )}


      <Row>
        {userExpeditions.map((expedition) => (
          <Col key={expedition.ID_Expedition} sm={4} style={{ marginBottom: '15px' }}>
            <ExpeditionCard expedition={expedition} />
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default Expeditions;
