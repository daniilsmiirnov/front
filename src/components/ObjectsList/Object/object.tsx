import React from 'react';
import { ObjectInt } from '../../../Models/object';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import defaultimg from '../../../assets/defimg.jpg'
interface ObjProps {
    obj: ObjectInt
}
  const Object: React.FC<ObjProps> = ({obj}) => {
    const navigate = useNavigate();
    const ButtonClick = () => {
      navigate("about/", {state: { object: obj}});
    };
    return (
      <Card style={{ width: '20rem', marginTop:'3rem',backgroundColor: 'lightgray' }}>
        <Card.Img style={{ width: '20rem',height:'20rem' }} variant="top" src={obj.Image_Url || defaultimg} />
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title>{obj.Name_Obj}</Card.Title>
          <Card.Text>
            {obj.Region}
          </Card.Text>
          <Button variant="secondary"  onClick={ButtonClick}>Подробнее</Button>
        </Card.Body>
      </Card>

    );
  };

export default Object;