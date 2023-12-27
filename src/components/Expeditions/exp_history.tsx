
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
  import { compose } from 'redux';

  interface ObjectInt {
    ID_Object: number;
    Name_Obj: string;
    Region: string;
    Year: number;
    Opener: string;
    Status: string;
    Image_Url: string;
  }
  interface CreatorInt {
    id: number;
    username: string;
  }
  
  interface ModeratorInt {
    id: number;
    username: string;
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
    Objects: ObjectInt[]; // Массив идентификаторов объектов
    Archive: string | null;
  }

  const ExpHistory: React.FC = () => {
    
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const userExpeditions = useSelector((state: RootState) => state.expeditions.expeditions);
    const navigate = useNavigate();
    const [filteredExpeditions, setFilteredExpeditions] = useState<any[]>(userExpeditions);
    const [filteredByUsernameExpeditions, setFilteredByUsernameExpeditions] = useState<any[]>(userExpeditions);
    // console.log('111',filteredExpeditions[0].CreatorId)
    const handleFilterChange = (filteredExpeditions: any[]) => {
      setFilteredExpeditions(filteredExpeditions);
    };
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
            dispatch(setExpeditions(expeditionsData));
            console.log(responseExp.data); 
          } else {
            throw new Error('Failed to fetch expeditions');
          }
        }
      } catch (error) {
        console.error('Error fetching expeditions:', error);
      }
    };
    // console.log('ffffff',filteredExpeditions[0].Moderator.username)
    useEffect(() => {
      const interval = setInterval(() => {
        fetchData();

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
    const handleAction = async (expeditionId: number, action: 'en' | 'ca') => {
      try {
        const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
        if (jwtTokenCookie) {
          const token = jwtTokenCookie.split('=')[1];
          const url = `http://127.0.0.1:8000/expedition/${expeditionId}/update_mod/`;
          const response = await axios.put(
            url,
            { Status: action },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          fetchData();
        }
      } catch (error) {
        console.error('Error updating expedition:', error);
      }
    };
    const handleRowClick = (expeditionId: number) => {
      navigate(`/expedition/${expeditionId}`); // Переход на страницу заявки по id
    };

    return (
      <>
        <NavigationBar />

        <div className="bg-secondary py-4">
          <Container fluid style={{ minHeight: '100vh' }} className="text-center">
          {user.Is_Super && (
          <ExpeditionFilter onFilterChange={(filteredExpeditions: any[]) => setFilteredExpeditions(filteredExpeditions)} />
          )}
            <h1>История Экспедиций</h1>
            {userExpeditions.length > 0 ? (
              <Table bordered hover responsive variant="dark">
                <thead>   
                  <tr>
                  {/* <th>Создатель</th> */}
                    <th>Название</th>
                    <th>Пользователь</th>
                    <th>Лидер</th>
                    <th>Дата начала</th>
                    <th>Дата окончания</th>
                    <th>Дата утверждения</th>
                    <th>Статус</th>
                    <th>Архив</th>
                    {/* <th>Creator</th> 
                    <th>Moderator</th> */}
                  </tr>
                </thead>
                <tbody>
                    
                {filteredExpeditions
                    .filter((expedition) => expedition.Status !== 'in' && expedition.Status !== 'de'  )
                      .map((expedition: Expedition, index: number) => (
                    
                  <tr key={expedition.ID_Expedition } className='bg-secondary py-4' >
                      
                      
                      <td onClick={() => handleRowClick(expedition.ID_Expedition)} style={{ cursor: 'pointer' }}>
                        {expedition.Name_Exp}
                      </td>
                      <td onClick={() => handleRowClick(expedition.ID_Expedition)} style={{ cursor: 'pointer' }}>
                        {expedition.ID_Creator.username}
                        
                      </td>

                      <td onClick={() => handleRowClick(expedition.ID_Expedition)} style={{ cursor: 'pointer' }}>
                        {expedition.Leader}
                      </td>
                      <td onClick={() => handleRowClick(expedition.ID_Expedition)} style={{ cursor: 'pointer' }}>
                        {formatDate(expedition.DateStart)}
                      </td>
                      <td onClick={() => handleRowClick(expedition.ID_Expedition)} style={{ cursor: 'pointer' }}>
                        {formatDate(expedition.DateEnd)}
                      </td>
                      <td onClick={() => handleRowClick(expedition.ID_Expedition)} style={{ cursor: 'pointer' }}>
                        {formatDate(expedition.DateApproving)}
                      </td>
                      <td onClick={() => handleRowClick(expedition.ID_Expedition)} style={{ cursor: 'pointer' }}>
                        {getStatusText(expedition.Status)}
                      </td>
                      <td onClick={() => handleRowClick(expedition.ID_Expedition)} style={{ cursor: 'pointer' }}>
                        {expedition.Archive || '-'}
                      </td>
                      {/* <td onClick={() => handleRowClick(expedition.ID_Expedition)} style={{ cursor: 'pointer' }}>
                {expedition.CreatorId ? expedition.CreatorId.username : '-'}
              </td>
              <td onClick={() => handleRowClick(expedition.ID_Expedition)} style={{ cursor: 'pointer' }}>
                {expedition.ModeratorId ? expedition.ModeratorId.username : '-'}
              </td> */}
                            {user.Is_Super && expedition.Status !== 'en' && expedition.Status !== 'ca' && (
                                <td  className='bg-secondary py-4'>
                                  <Button variant="primary" className="me-2 " onClick={() => handleAction(expedition.ID_Expedition, 'en')}>
                                  Принять
                                  </Button>
                                </td>      
                              )}
                            {user.Is_Super && expedition.Status !== 'en' && expedition.Status !== 'ca' &&(
                                <td className='bg-secondary py-4'>
                                  <Button variant="dark" className="me-2"onClick={() => handleAction(expedition.ID_Expedition, 'ca')}>
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
