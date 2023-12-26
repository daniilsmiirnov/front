import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';
import NavigationBar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

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
  const [isCreating, setIsCreating] = useState(false); // Создаем состояние для определения создания объекта
  const navigate = useNavigate(); // Использование useNavigate для программной навигации

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ObjectInt[]>('http://127.0.0.1:8000/objectde/');
        if (response.status === 200) {
          setObjects(response.data);
        } else {
          throw new Error('Failed to get data from the server');
        }
      } catch (error) {
        console.error(error);
        setObjects([]);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    console.log(`Edit object with ID ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete object with ID ${id}`);
  };

  const handleRowClick = (id: number) => {
    navigate(`/object/${id}`); // Программный переход на страницу ObjectDetails по ID объекта
  };

  const handleCreateObject = () => {
    setIsCreating(true); // Устанавливаем состояние создания нового объекта в true
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
                </tr>
              </thead>
              <tbody>
                {objects.map((obj) => (
                  <tr key={obj.ID_Object} onClick={() => handleRowClick(obj.ID_Object)}>
                    <td>{obj.Name_Obj}</td>
                    <td>{obj.Region}</td>
                    <td>{obj.Year}</td>
                    <td>{obj.Opener}</td>
                    <td>{obj.Status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
        </Container>
      </div>
    </>
  );
};

export default ObjectTable;
