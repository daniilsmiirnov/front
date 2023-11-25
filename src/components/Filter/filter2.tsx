import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface FilterProps {
  onFilterChange: (filteredObjects: ObjectInt[]) => void;
}

interface ObjectInt {
  ID_Object: number;
  Name_Obj: string;
  Region: string;
  Year: number;
  Opener: string;
  Status: string;
  Image_Url: string;
}

const ObjectFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [name, setName] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [opener, setOpener] = useState<string>('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(event.target.value);
  };

  const handleOpenerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpener(event.target.value);
  };

  useEffect(() => {
    const fetchFilteredObjects = async () => {
      try {
        const response: AxiosResponse<ObjectInt[]> = await axios.get<ObjectInt[]>('http://127.0.0.1:8000/object/', {
          params: { name, year, opener },
        });
        onFilterChange(response.data);
      } catch (error) {
        console.error('Ошибка при получении отфильтрованных объектов:', error);
      }
    };

    fetchFilteredObjects();
  }, [name, year, opener, onFilterChange]);

  return (
    <div className='bg-secondary'>
      <input type="text" placeholder="Поиск по названию" value={name} onChange={handleNameChange} />
      <input type="text" placeholder="Фильтр по году" value={year} onChange={handleYearChange} />
      <input type="text" placeholder="Фильтр по открывшему" value={opener} onChange={handleOpenerChange} />
    </div>
  );
};

export default ObjectFilter;
