import React from 'react';
import { ObjectInt } from '../../../Models/object';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import defaultimg from '../../../assets/defimg.jpg'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { compose } from 'redux';
interface ObjProps {
    obj: ObjectInt
}
  const Object: React.FC<ObjProps> = ({obj}) => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const addToExpedition = async () => {
      try {
        const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    
        if (jwtTokenCookie) {
          const token = jwtTokenCookie.split('=')[1];
          
          const response = await axios.post(
            `http://127.0.0.1:8000/object/${obj.ID_Object}/`,
            {},

            {
              withCredentials: true,
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
    
          console.log(response);
        } else {
          console.error('Токен JWT отсутствует в куки.');
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };
    // const addToExpedition = async () => {
    //   try {
    //     console.log('cooki:', document.cookie);
    //     const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    //     if (jwtCookie) {
    //       const token = jwtCookie.split('=')[1];
          
    //       const response = await axios.post(
    //         `http://127.0.0.1:8000/object/${obj.ID_Object}/`, 
    //         null, 
    //         {
    //           headers: {
    //             Authorization: `jwt=${token}`,
    //           },
    //         }
    //       );
    //       console.log(response);
    //     } else {
    //       throw new Error('jwtToken cookie not found');
    //     }
    
    //     // const response = await axios.post(
    //     //   `http://127.0.0.1:8000/object/${obj.ID_Object}/`);
    //     // //   {
    //     // //     headers: {
    //     // //       Authorization: `Bearer ${token}`, 
    //     // //     },
    //     // //   }
    //     // // const response = await axios.post(`http://127.0.0.1:8000/object/${obj.ID_Object}/`);
    //     // console.log(response)
    //   } catch (error) {
    //     // console.log(response)
    //     console.error('ошибка:',error)
    //   }
    // };
    const ButtonClick = () => {
      navigate("about/", {state: { object: obj}});
    };
    return (
      <Card style={{ width: '16rem', marginTop:'3rem',backgroundColor: 'lightgray' }}>
        <Card.Img style={{ width: '16rem',height:'13rem' }} variant="top" src={obj.Image_Url || defaultimg} />
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title>{obj.Name_Obj}</Card.Title>
          <Card.Text>
            {obj.Region}
          </Card.Text>
          {user.id!=-1 && ( // Отображение кнопки только при наличии авторизации пользователя
          <Button  style={{ marginBottom: "5px" }} variant="secondary" onClick={addToExpedition}>
            Добавить в экспедицию
          </Button>
        )}
          <Button variant="secondary"  onClick={ButtonClick}>Подробнее</Button>
        </Card.Body>
      </Card>

    );
  };

export default Object;