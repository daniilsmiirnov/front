import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import ExpeditionCard from './exp_card'; 
import NavigationBar from "../Navbar/Navbar";
import { addToCart, removeFromCart } from '../../store/CartSlice';
import { setExpeditions } from '../../store/ExpeditionSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// interface ObjectInt {
//   ID_Object: number;
//   Name_Obj: string;
//   Region: string;
//   Year: number;
//   Opener: string;
//   Status: string;
//   Image_Url: string;
// }

// interface Expedition {
//   ID_Expedition: number;
//   Name_Exp: string;
//   DateStart: string;
//   DateEnd: string | null;
//   DateApproving: string | null;
//   Status: string;
//   Leader: string;
//   ModeratorId: number | null;
//   CreatorId: number | null;
//   Describe: string | null;
//   Objects: ObjectInt[]; 
//   Archive: string | null;
// }
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
  CreatorId: CreatorInt | null;
  ModeratorId: ModeratorInt | null;
  Describe: string | null;
  Objects: ObjectInt[]; 
  Archive: string | null;
}

const Expeditions: React.FC = () => {
  const expedition = useSelector((state: RootState) => state.cart.expedition);
  const userExpeditions = useSelector((state: RootState) => state.expeditions.expeditions);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const expeditions = useSelector((state: RootState) => state.expeditions.expeditions);
  const expeditionn = expeditions.find(exp => exp.ID_Expedition.toString() === id);
  const [formData, setFormData] = useState<Expedition | null>(expeditionn || null);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = { ...formData };
    updatedFormData.Name_Exp = e.target.value;
    setFormData(updatedFormData);
  };
  const deleteExpedition = async (expeditionId: number) => {

    try {
      const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
      if (jwtTokenCookie) {
        const token = jwtTokenCookie.split('=')[1];
        const response = await axios.delete(
          `http://127.0.0.1:8000/expedition/${expeditionId}/`,
          {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
          const responseExp = await axios.get(
            'http://127.0.0.1:8000/expedition/',
            {
              withCredentials: true,
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          if (responseExp.status === 200) {
            const expeditionsData: Expedition[] = Array.isArray(responseExp.data) ? responseExp.data : [];
            dispatch(setExpeditions(expeditionsData));
            console.log(1)
            dispatch(removeFromCart());
            console.log(2)
            navigate('/');
          }
        } else {
          throw new Error('Ошибка при удалении экспедиции');
        }
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };
  const handleLeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = { ...formData };
    updatedFormData.Leader = e.target.value;
    setFormData(updatedFormData);
  };
  
  const handleDescribeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = { ...formData };
    updatedFormData.Describe = e.target.value;
    setFormData(updatedFormData);
  };
  const handleDeleteExpedition = () => {
    
    if (expedition?.ID_Expedition) {
      deleteExpedition(expedition.ID_Expedition);
    }

  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData && expedition !== null) {
        const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    
        if (jwtTokenCookie) {
          const token = jwtTokenCookie.split('=')[1];
          console.log('tokennnnnnnnnnnnnn',token);
          const expeditionId = expedition.ID_Expedition;
          const responseChange = await axios.put(
            `http://127.0.0.1:8000/expedition/${expeditionId}/`,
            formData, // Отправляем formData напрямую без дополнительной обёртки
            {
              withCredentials: true,
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
  
          if (responseChange.status===200) {
            const responseExp = await axios.get(
              'http://127.0.0.1:8000/expedition/',
              {
                withCredentials: true,
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            if (responseExp.status===200){
              const expeditionsData: Expedition[] = Array.isArray(responseExp.data) ? responseExp.data : [];
              const expeditionIn = expeditionsData.find(expedition => expedition.Status === 'in');
              dispatch(setExpeditions(expeditionsData));
              if (expeditionIn) {
                console.log('cart:',expeditionIn);
                dispatch(addToCart(expeditionIn));
              }
            }
            // Дополнительные действия после успешной отправки на бэкенд
          } else {
            throw new Error('Ошибка при отправке данных на бэкенд');
          }
        }
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };
  const handleDeleteObject = async (expeditionId: number, objectId: number) => {
    try {
      const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
      if (jwtTokenCookie) {
        const token = jwtTokenCookie.split('=')[1];
        const response = await axios.delete(
          `http://127.0.0.1:8000/expedition/${expeditionId}/delete_exp/${objectId}`,
          {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
          const responseExp = await axios.get(
            'http://127.0.0.1:8000/expedition/',
            {
              withCredentials: true,
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          if (responseExp.status===200){
            const expeditionsData: Expedition[] = Array.isArray(responseExp.data) ? responseExp.data : [];
            const expeditionIn = expeditionsData.find(expedition => expedition.Status === 'in');
            dispatch(setExpeditions(expeditionsData));
            if (expeditionIn) {
              console.log('cart:',expeditionIn);
              dispatch(addToCart(expeditionIn));
              const updatedFormData = { ...formData };
              updatedFormData.Objects = updatedFormData.Objects.filter(
                (object) => object.ID_Object !== objectId
              );
              setFormData(updatedFormData);

            }
          }

        } else {
          throw new Error('Ошибка при удалении объекта из экспедиции');
        }
      }
    } catch (error) {
      console.error('Произошла ошибка при удалении объекта:', error);
    }
  };
  const handleFormExpedition = async () => {
    try {
      const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
      if (jwtTokenCookie) {
        const token = jwtTokenCookie.split('=')[1];
        const response = await axios.get(
          'http://127.0.0.1:8000/expedition/update_user/',
          {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
          const responseExp = await axios.get(
            'http://127.0.0.1:8000/expedition/',
            {
              withCredentials: true,
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          if (responseExp.status===200){
            const expeditionsData: Expedition[] = Array.isArray(responseExp.data) ? responseExp.data : [];
            const expeditionIn = expeditionsData.find(expedition => expedition.Status === 'in');
            dispatch(setExpeditions(expeditionsData));
           
            console.log('cart:',expeditionIn);
            dispatch(removeFromCart());
            console.log('cart2:',expeditionIn);
            navigate('/');
            
          }
          console.log('Данные успешно получены');
        } else {
          throw new Error('Ошибка при формировании экспедиции');
        }
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
    
  };
  return (
    <>
      <NavigationBar />
      <Container fluid className="bg-secondary d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Col md={4}></Col>
        <Col md={4}>
          <Row className="justify-content-center">
            <Col>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formName" className="mb-3" style={{ marginTop: '50px'}}>
                  <Form.Control
                    type="text"
                    defaultValue={formData?.Name_Exp || ''}
                    onChange={handleNameChange}
                    disabled={expeditionn?.Status !== 'in'}
                  />
                </Form.Group>
                <Form.Group controlId="formLeader" className="mb-3">
                  <Form.Control
                    type="text"
                    defaultValue={formData?.Leader || ''}
                    onChange={handleLeaderChange}
                    disabled={expeditionn?.Status !== 'in'}
                  />
                </Form.Group>
                <Form.Group controlId="formDescribe" className="mb-3">
                  <Form.Control
                    type="text"
                    defaultValue={formData?.Describe || ''}
                    onChange={handleDescribeChange}
                    disabled={expeditionn?.Status !== 'in'}
                  />
                </Form.Group>
                <Form.Group controlId="formObjects" className="mb-2  text-center">
                  <h4>Объекты</h4>
                  <div className="d-flex flex-column">
                    {formData?.Objects.map((object) => (
                      <div key={object.ID_Object} className="card mb-3">
                        <img src={object.Image_Url} className="card-img-top" alt={object.Name_Obj} style={{ maxHeight: '200px', objectFit: 'cover' }} />
                        <div className="card-body  text-center">
                          <h5 className="card-title  text-center">{object.Name_Obj}</h5>
                          <h6 className="card-subtitle mb-2 text-muted  text-center">{object.Region} ({object.Year})</h6>
                          {expeditionn?.Status === 'in' && (
                              <Button
                                variant="dark"
                                size="sm"
                                onClick={() => {
                                  handleDeleteObject(expedition?.ID_Expedition || 0, object.ID_Object);
                                }}
                              >
                                Удалить
                              </Button>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="d-flex flex-column align-items-center justify-content-start">
        {expeditionn?.Status === 'in' && (
          <div className="mt-3 mb-auto">
            <Button variant="dark" type="submit" onClick={handleFormSubmit}>
              Изменить экспедицию
            </Button>
          </div>
            )}
              {expeditionn?.Status === 'in' && (
                <div className="mt-3">
                  <Button variant="dark" onClick={handleFormExpedition}>
                    Сформировать экспедицию
                  </Button>
                </div>
              )}
              {expeditionn?.Status === 'in' && (
              <div className="mt-3">
                <Button variant="dark" onClick={handleDeleteExpedition}>
                  Удалить
                </Button>
              </div>
            )}
        </Col>
      </Container>
    </>
  );
};

export default Expeditions;