import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ExpeditionInt } from '../../Models/expedition';
import ExpeditionCard from './exp_card';

const Expeditions: React.FC = () => {
  const [expeditions, setExpeditions] = useState<ExpeditionInt[]>([]);

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/expedition/');
        console.log(response.data)
        setExpeditions(response.data);
      } catch (error) {
        console.error('Ошибка получения экспедиций:', error);
      }
    };

    fetchExpeditions();
  }, []);

  return (
    <div className="all-expeditions">
      <h1>Все экспедиции</h1>
      <div className="expeditions-list">
        {expeditions.map((expedition) => (
          <ExpeditionCard key={expedition.ID_Expedition} exp={expedition} />
        ))}
      </div>
    </div>
  );
};

export default Expeditions;
