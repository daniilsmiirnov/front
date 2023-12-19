
import { useSelector,useDispatch } from 'react-redux';
import { Container, Table, Alert, Button } from 'react-bootstrap';
import { RootState } from '../../store/store';
import NavigationBar from "../Navbar/Navbar";
import React, { useEffect } from 'react';
import  { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { setExpeditions } from '../../store/ExpeditionSlice';
import axios from 'axios';
import  ExpeditionFilter from '../Filter/filterExp';
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

const ExpHistory: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const userExpeditions = useSelector((state: RootState) => state.expeditions.expeditions);
  const navigate = useNavigate();
  const [filteredExpeditions, setFilteredExpeditions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
        if (jwtTokenCookie) {
          const token = jwtTokenCookie.split('=')[1];
          const responseExp = await axios.get('http://127.0.0.1:8000/expedition/', {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (responseExp.status === 200) {
            const expeditionsData: Expedition[] = Array.isArray(responseExp.data) ? responseExp.data : [];
            dispatch(setExpeditions(expeditionsData)); // Используем action SetExpedition для сохранения данных в хранилище
          } else {
            throw new Error('Failed to fetch expeditions');
          }
        }
      } catch (error) {
        console.error('Error fetching expeditions:', error);
      }
    };

    const interval = setInterval(() => {
      fetchData(); // Периодический запрос

    }, 3000); 
    fetchData(); 
    return () => clearInterval(interval);
  }, [dispatch]);
  const formatDate = (dateString: string | null): string => {
    if (dateString === null) {
      return 'Нет данных';
    }
  
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}, ${hours}:${minutes}`;
  };
 
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
  const handleRowClick = (expeditionId: number) => {
    navigate(`/expedition/${expeditionId}`); // Переход на страницу заявки по id
  };
  const renderModeratorButtons = (expedition: any) => {
    if (user.Is_Super) { // Проверка роли пользователя
      return (
        <>
          <Button variant="success" className="me-2">
            Принять
          </Button>
          <Button variant="danger">
            Отклонить
          </Button>
        </>
      );
    }
    return null; // Если пользователь не модератор, возвращаем null
  };
  return (
    <>
      <NavigationBar />

      <div className="bg-secondary py-4">
        <Container fluid style={{ minHeight: '100vh' }} className="text-center">
        <ExpeditionFilter onFilterChange={(filteredExpeditions: any[]) => setFilteredExpeditions(filteredExpeditions)} />
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
                  <th>Архив</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpeditions.map((expedition) => (
                <tr key={expedition.ID_Expedition}
                       onClick={() => handleRowClick(expedition.ID_Expedition)} 
                        style={{ cursor: 'pointer' }} >
                    <td>

                        {expedition.Name_Exp}

                    </td>
                    <td>{expedition.Leader}</td>
                    <td>{formatDate(expedition.DateStart)}</td>
                    <td>{formatDate(expedition.DateEnd)}</td>
                    <td>{formatDate(expedition.DateApproving)}</td>
                    <td>{getStatusText(expedition.Status)}</td>
                    <td>{expedition.Archive || '-'}</td>
                      {user.Is_Super && (
                          <td>
                            <Button variant="primary" className="me-2">
                             Принять
                            </Button>
                          </td>      
                        )}
                      {user.Is_Super && (
                          <td>
                            <Button variant="secondary" className="me-2">
                             Отклонить
                            </Button>
                          </td>      
                        )} 
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
