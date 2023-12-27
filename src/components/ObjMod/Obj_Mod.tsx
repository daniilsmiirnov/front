import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';
import NavigationBar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { compose } from 'redux';

export interface ObjectInt {
  ID_Object: number;
  Name_Obj: string;
  Region: string;
  Year: number;
  Opener: string;
  Status: string;
  Image_Url: string;
}

const ObjectTable: React.FC = () => {
  const [objects, setObjects] = useState<ObjectInt[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleDeleteObject = async (id: number) => {
    try {
      const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
      if (jwtTokenCookie) {
        const token = jwtTokenCookie.split('=')[1];

        const response = await axios.delete(
          `http://127.0.0.1:8000/object/${id}/`,
          {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Если удаление прошло успешно, обновляем данные
          fetchData();
          console.log(2)
        }
        fetchData();
      } else {
        console.error('JWT token not found');
      }
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  };

  const handleDelete = (id: number) => {
    handleDeleteObject(id);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<ObjectInt[]>('http://127.0.0.1:8000/objectde/');
      if (response.status === 200) {
        setObjects(response.data); // Устанавливаем состояние после успешного получения данных
      } else {
        throw new Error('Failed to get data from the server');
      }
    } catch (error) {
      console.error(error);
      setObjects([]);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(1) // Вызываем загрузку данных при монтировании компонента
  }, []);


  const handleRowClick = (id: number) => {
    navigate(`/object/${id}`);
  };

  const handleCreateObject = () => {
    setIsCreating(true);
    navigate('/object/0');
  };

  return (
    <>
      <NavigationBar />
      <div className="bg-secondary py-4">
        <Container fluid style={{ minHeight: '100vh' }} className="text-center">
          <h1>Список объектов</h1>
          <Button variant="dark" style={{ marginBottom: '20px' }} onClick={handleCreateObject}>
            Создать объект
          </Button>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Название</th>
                <th>Регион</th>
                <th>Год</th>
                <th>Открыватель</th>
                <th>Статус</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {objects.map((obj) => (
                <tr key={obj.ID_Object}>
                 <td onClick={() => handleRowClick(obj.ID_Object)} style={{ cursor: 'pointer' }}>
                  {obj.Name_Obj}</td>

                  <td onClick={() => handleRowClick(obj.ID_Object)} style={{ cursor: 'pointer' }}>
                    {obj.Region}</td>
                    <td onClick={() => handleRowClick(obj.ID_Object)} style={{ cursor: 'pointer' }}>
                      {obj.Year}</td>
                      <td onClick={() => handleRowClick(obj.ID_Object)} style={{ cursor: 'pointer' }}>
                        {obj.Opener}</td>
                        <td onClick={() => handleRowClick(obj.ID_Object)} style={{ cursor: 'pointer' }}>
                          {obj.Status}</td>
                  <td>
                    <Button variant="secondary" onClick={() => handleDelete(obj.ID_Object)}>
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
};

export default ObjectTable;
