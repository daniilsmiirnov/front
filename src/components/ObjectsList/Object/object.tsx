import React from 'react';
import { ObjectInt } from '../../../Models/object';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={obj.Image_Url} />
      <Card.Body>
        <Card.Title>{obj.Name_Obj}</Card.Title>
        <Card.Text>
          {obj.Region}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
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