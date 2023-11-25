import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ExpeditionInt } from '../../Models/expedition';


interface ExpProps {
    exp: ExpeditionInt
}
interface ExpeditionCardProps {
  exp: ExpeditionInt;
}

const ExpeditionCard: React.FC<ExpeditionCardProps> = ({ exp }) => {
  return (
    <div className="expedition-card">
      <h2>{exp.Name_Exp}</h2>
      <p>ID экспедиции: {exp.ID_Expedition}</p>
      <p>Описание: {exp.Describe}</p>
      <p>Дата начала: {exp.DateStart}</p>
      <p>Дата завершения: {exp.DateEnd}</p>
      <p>Дата утверждения: {exp.DateApproving}</p>
      <p>Статус: {exp.Status}</p>
      <p>Лидер: {exp.Leader}</p>
      <p>Модератор: {exp.Moderator}</p>
      <p>ID создателя: {exp.ID_Creator}</p>
      <p>Объекты: {exp.Objects}</p>
      {/* Добавьте отображение других полей экспедиции */}
    </div>
  );
};

export default ExpeditionCard;

