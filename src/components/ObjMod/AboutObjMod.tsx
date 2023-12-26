import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Col, Row, Image } from 'react-bootstrap';
import NavigationBar from '../Navbar/Navbar';

interface ObjectData {
  ID_Object: number;
  Name_Obj: string;
  Region: string;
  Year: number;
  Opener: string;
  Status: string;
  Image_Url: File | string;
}

const ObjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [objectData, setObjectData] = useState<ObjectData>({
    ID_Object: 0,
    Name_Obj: '',
    Region: '',
    Year: 0,
    Opener: '',
    Status: '',
    Image_Url: '',
  });

  useEffect(() => {
    const fetchObject = async () => {
      try {
        const jwtTokenCookie = document.cookie.split('; ').find((row) => row.startsWith('jwt='));
        if (jwtTokenCookie) {
          const token = jwtTokenCookie.split('=')[1];
          const url = `http://127.0.0.1:8000/object/${id}`;
          const response = await axios.get(url, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 200) {
            setObjectData(response.data);
          } else {
            throw new Error('Failed to get data from the server');
          }
        }
      } catch (error) {
        console.error(error);
        setObjectData({
          ID_Object: 0,
          Name_Obj: '',
          Region: '',
          Year: 0,
          Opener: '',
          Status: '',
          Image_Url: '',
        });
      }
    };

    fetchObject();
  }, [id]);
  const handleCreateObject = async () => {
    try {
      const jwtTokenCookie = document.cookie.split('; ').find((row) => row.startsWith('jwt='));
      if (jwtTokenCookie) {
        const token = jwtTokenCookie.split('=')[1];
        const randomID = Math.floor(Math.random() * 1000);
        const formData = new FormData();
        formData.append('ID_Object', randomID.toString()); 
        formData.append('Name_Obj', objectData.Name_Obj);
        formData.append('Region', objectData.Region);
        formData.append('Year', objectData.Year.toString());
        formData.append('Opener', objectData.Opener);
        formData.append('Status', 'ope');
        if (objectData.Image_Url instanceof File) {
          formData.append('Image_Url', objectData.Image_Url);
        }
  
        const response = await axios.post(
          `http://127.0.0.1:8000/object/create/`,
          formData,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        if (response.status === 200) {
          setIsCreating(true);
          setObjectData({
            ID_Object: response.data.ID_Object,
            Name_Obj: '',
            Region: '',
            Year: 0,
            Opener: '',
            Status: '',
            Image_Url: '',
          });
        }
      } else {
        console.error('JWT token not found');
      }
      navigate('/object_list')
    } catch (error) {
      console.error('Error creating object:', error);
    }
  };
  const handleEditObject = async () => {
    try {
      const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
      if (jwtTokenCookie) {
        const token = jwtTokenCookie.split('=')[1];
        const objectId = objectData.ID_Object;

        const formData = new FormData();
        formData.append('ID_Object', objectData.ID_Object.toString());
        formData.append('Name_Obj', objectData.Name_Obj);
        formData.append('Region', objectData.Region);
        formData.append('Year', objectData.Year.toString());
        formData.append('Opener', objectData.Opener);
        formData.append('Status', objectData.Status);
        if (objectData.Image_Url instanceof File) {
          formData.append('Image_Url', objectData.Image_Url);
        }

        const responseChange = await axios.put(
          `http://127.0.0.1:8000/object/${objectId}/`,
          formData,
          {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (responseChange.status === 200) {
          
            navigate('/object_list'); // Redirect to object_list on successful delete
         
        }
      } else {
        console.error('JWT token not found');
      }
    } catch (error) {
      console.error('Error editing object:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setObjectData({ ...objectData, Image_Url: selectedFile });
    }
  };

  const handleDelete = () => {
    setObjectData({ ...objectData, Status: 'del' }); // Change status to 'del' when deleting
    handleEditObject(); // Invoke the edit method for deletion
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setObjectData({ ...objectData, Name_Obj: e.target.value });
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setObjectData({ ...objectData, Region: e.target.value });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setObjectData({ ...objectData, Year: parseInt(e.target.value, 10) });
  };

  const handleOpenerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setObjectData({ ...objectData, Opener: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setObjectData({ ...objectData, Status: e.target.value });
  };

  return (
    <>
      <NavigationBar />
      <Container fluid className="bg-secondary align-items-center" style={{ minHeight: '100vh' }}>
        <h1 className="text-center mb-4">Детали объекта</h1>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            {objectData.Image_Url && <Image src={objectData.Image_Url} alt="Object" rounded style={{ width: '400px', height: '300px' }} />}
          </Col>
        </Row>
        <Form>
          <Row className="justify-content-center">
            <Col md={6}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Имя объекта</Form.Label>
                <Form.Control type="text" value={objectData.Name_Obj} onChange={handleNameChange} />
              </Form.Group>
              <Form.Group controlId="formRegion" className="mb-3">
                <Form.Label>Регион</Form.Label>
                <Form.Control type="text" value={objectData.Region} onChange={handleRegionChange} />
              </Form.Group>
              <Form.Group controlId="formYear" className="mb-3">
                <Form.Label>Год</Form.Label>
                <Form.Control type="number" value={objectData.Year} onChange={handleYearChange} />
              </Form.Group>
              <Form.Group controlId="formOpener" className="mb-3">
                <Form.Label>Открывший</Form.Label>
                <Form.Control type="text" value={objectData.Opener} onChange={handleOpenerChange} />
              </Form.Group>
              <Form.Group controlId="formStatus" className="mb-3">
                <Form.Label>Статус</Form.Label>
                <Form.Control as="select" value={objectData.Status} onChange={handleStatusChange}>
                  <option value="ope">Действует</option>
                  <option value="del">Удален</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>Загрузить файл</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {id === '0' ? (
              <Button variant="dark" className="col-auto" onClick={handleCreateObject}>
                Создать
              </Button>
            ) : (
              <>
                <Button variant="dark" className="me-2 col-auto" onClick={handleEditObject}>
                  Редактировать
                </Button>
                {/* <Button variant="dark" className="col-auto" onClick={handleDelete}>
                  Удалить
                </Button> */}
              </>
            )}
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default ObjectDetails;
