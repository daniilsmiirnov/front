import React from 'react';
import { Card, Button } from 'react-bootstrap';
const formattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleString('en-US', options);
};

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
  DateEnd: string| null;
  DateApproving: string | null;
  Status: string;
  Leader: string;
  ModeratorId: number | null;
  CreatorId: number | null;
  Describe: string | null;
  Objects: ObjectInt[]; 
  Archive: string | null;
}
interface Props {
  expedition: Expedition;
}
const getStatusText = (statusCode: string): string => {
  const statusMap: { [key: string]: string } = {
    in: 'Введён',
    wo: 'В работе',
    en: 'Завершён',
    ca: 'Отменён',
    de: 'Удалён',
  };

  return statusMap[statusCode] || 'Неизвестный статус';
};
const ExpeditionCard: React.FC<Props> = ({ expedition }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{expedition.Name_Exp}</Card.Title>
        <Card.Text>Дата создания: {formattedDate(expedition.DateStart)}</Card.Text>
        <Card.Text>Дата окончания: {formattedDate(expedition.DateEnd || '')}</Card.Text>
        <Card.Text>Лидер: {expedition.Leader}</Card.Text>
        <Card.Text>Статус: {getStatusText(expedition.Status)}</Card.Text>
        <Card.Text>Архив: {expedition.Archive}</Card.Text>
        <Card.Text>
        Географические объекты:
        <ul>
          {expedition.Objects.map((object) => (
            <li key={object.ID_Object}>
               {object.Name_Obj}
            </li>
          ))}
        </ul>
      </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ExpeditionCard;
