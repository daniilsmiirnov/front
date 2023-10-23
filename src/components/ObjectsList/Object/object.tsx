import React from 'react';
import { ObjectInt } from '../../../Models/object';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
interface ObjProps {
    // ID_Object: number;
    // Name_Obj: string;
    // Region: string;
    // Year: number;
    // Opener: string;
    // Status: string;
    // Image_Url: string;
    obj: ObjectInt
}
  const Object: React.FC<ObjProps> = ({obj}) => {
    const navigate = useNavigate();
    const ButtonClick = () => {
      navigate("about/", {state: { object: obj}});
    };
    return (
      <Card style={{ width: '20rem', marginTop:'3rem',backgroundColor: 'lightgray' }}>
        <Card.Img style={{ width: '20rem',height:'20rem' }} variant="top" src={obj.Image_Url} />
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title>{obj.Name_Obj}</Card.Title>
          <Card.Text>
            {obj.Region}
          </Card.Text>
          <Button variant="secondary"  onClick={ButtonClick}>Подробнее</Button>
        </Card.Body>
      </Card>
      // <div>
      //   {obj.ID_Object}
      //   <img src={obj.Image_Url} alt="" />
      //   {obj.Name_Obj}
      // </div>
    );
  };

export default Object;