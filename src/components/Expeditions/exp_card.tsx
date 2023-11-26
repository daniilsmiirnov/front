import React from 'react';
import { Card, Button } from 'react-bootstrap';
// Импортируйте интерфейс Expedition из вашего файла

interface ObjectInt {
  ID_Object: number;
  Name_Obj: string;
  Region: string;
  Year: number;
  Opener: string;
  Status: string;
  Image_Url: string;
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
interface Props {
  expedition: Expedition;
}

const ExpeditionCard: React.FC<Props> = ({ expedition }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{expedition.Name_Exp}</Card.Title>
        <Card.Text>Дата создания: {expedition.DateStart}</Card.Text>
        <Card.Text>Дата окончания: {expedition.DateEnd}</Card.Text>
        <Card.Text>Лидер: {expedition.Leader}</Card.Text>
        <Card.Text>
          Географические объекты:
          <ul>
            {expedition.Objects.map((object) => (
              <li key={object.ID_Object}>
                {object.Name_Obj} - {object.Region} ({object.Year})
              </li>
            ))}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ExpeditionCard;
