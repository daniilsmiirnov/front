import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Table, Alert } from 'react-bootstrap';
import { RootState } from '../../store/store';
import NavigationBar from "../Navbar/Navbar";
import { Link } from 'react-router-dom';
const ExpHistory: React.FC = () => {
  const userExpeditions = useSelector((state: RootState) => state.expeditions.expeditions);

  return (
    <>
      <NavigationBar />
      <div className="bg-secondary py-4">
        <Container fluid style={{ minHeight: '100vh' }} className="text-center">
          <h1>История Экспедиций</h1>
          {userExpeditions.length > 0 ? (
            <Table striped bordered hover responsive variant="dark">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Лидер</th>
                  <th>Дата начала</th>
                  <th>Дата окончания</th>
                  <th>Дата утверждения</th>
                  <th>Статус</th>

                </tr>
              </thead>
              <tbody>
                {userExpeditions.map((expedition) => (
                  <tr key={expedition.ID_Expedition}>
                    <td>
                      <Link to={`/expedition/${expedition.ID_Expedition}`}>
                        {expedition.Name_Exp}
                      </Link>
                    </td>
                    <td>{expedition.Leader}</td>
                    <td>{expedition.DateStart}</td>
                    <td>{expedition.DateEnd}</td>
                    <td>{expedition.DateApproving || '-'}</td>
                    <td>{expedition.Status}</td>

                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info" className="mt-3">
              История пуста
            </Alert>
          )}
        </Container>
      </div>
    </>
  );
};

export default ExpHistory;
