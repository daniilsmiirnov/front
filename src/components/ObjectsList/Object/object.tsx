import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import defaultimg from '../../../assets/defimg.jpg'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setExpeditions } from '../../../store/ExpeditionSlice';
import { addToCart } from '../../../store/CartSlice';
interface ObjProps {
    obj: ObjectInt
}
// export interface ObjectInt {
//   ID_Object: number;
//   Name_Obj: string;
//   Region: string;
//   Year: number;
//   Opener: string;
//   Status: string;
//   Image_Url: string;
// }
export interface ObjectExp {
  expedition_draft: number;
  objects: ObjectInt[];
}

export interface ObjectInt {
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
  const Object: React.FC<ObjProps> = ({obj}) => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const dispatch= useDispatch();
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
          console.log("1",response);
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
          console.log(responseExp);
          
        } else {
          console.error('Токен JWT отсутствует в куки.');
        }

      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
      
    };


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
              {user.id !== -1 && (
                <Button style={{ marginBottom: "5px" }} variant="secondary" onClick={addToExpedition}>
                  Добавить в экспедицию
                </Button>
                )}
          <Button variant="secondary"  onClick={ButtonClick}>Подробнее</Button>
        </Card.Body>
      </Card>

    );
  };

export default Object;