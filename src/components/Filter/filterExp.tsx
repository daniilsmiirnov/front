import React, { useEffect } from 'react';
import {useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setFilterStatus, setFromDate, setToDate,setFilterUser } from '../../store/FilterExpSlice';
import { Container, Form } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import axios, { AxiosResponse } from 'axios';
import { format } from 'date-fns';
interface ExpeditionFilterProps {
  onFilterChange: (filteredExpeditions: any[]) => void;
}

const ExpeditionFilter: React.FC<ExpeditionFilterProps> = ({ onFilterChange }) => {
  const filterStatus = useSelector((state: RootState) => state.expeditionFilter.Status);
  const filterFromDate = useSelector((state: RootState) => state.expeditionFilter.fromDate);
  const filterToDate = useSelector((state: RootState) => state.expeditionFilter.toDate);
  const filterSelectedUser = useSelector((state: RootState) => state.expeditionFilter.selectedUser);
  const expeditions = useSelector((state: RootState) => state.expeditions.expeditions);
  const dispatch = useDispatch();
  const [usernameFilter, setUsernameFilter] = useState('');
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsernameFilter(username);
    dispatch(setFilterUser(username));
  

    const filteredExpeditions = expeditions.filter((expedition) => {
      return expedition.ID_Creator && expedition.ID_Creator.username === username;
    });
  
    // Вызов функции onFilterChange с отфильтрованными данными
    onFilterChange(filteredExpeditions);
  };

  const filterExpeditionsByUsername = async (username: string) => {
    try {
      // Выполнение фильтрации экспедиций по имени пользователя
      const filtered = expeditions.filter((expedition) => {
        return expedition.ID_Creator && expedition.ID_Creator.username === username;
      });
      return filtered;
    } catch (error) {
      throw new Error('Failed to filter expeditions by username');
    }
  };
   



  // const handleFilterChange = async () => {
    // let filteredExpeditions = expeditions.filter((expedition) => {
    //   let isValid = true;
    //   if (filterStatus && expedition.Status !== filterStatus) {
    //     isValid = false;
    //   }
    //   if (filterFromDate && expedition.DateStart < filterFromDate) {
    //     isValid = false;
    //   }
    //   if (filterToDate && expedition.DateEnd > filterToDate) {
    //     isValid = false;
    //   }
    //   return isValid;
    // });
    
    const handleFilterChange = async () => {
      try {
        const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
        const token = jwtTokenCookie ? jwtTokenCookie.split('=')[1] : null;
        const formatDate = (dateString: string | undefined): string | null => {
          if (!dateString) return null; // Если дата отсутствует, возвращаем null или установите другое значение по умолчанию
    
          const date = new Date(dateString);
          return format(date, 'yyyy-MM-dd HH:mm:ss'); // Формат: YYYY-MM-DD HH:MM:SS
        };
      
        const response: AxiosResponse<any[]> = await axios.get('http://127.0.0.1:8000/expedition/', {
          params: {
            status: filterStatus,
            DateFormStart: formatDate(filterFromDate),
            DateFormEnd: formatDate(filterToDate),
          },
          headers: {
            'Authorization': token ? `Bearer ${token}` : null,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
  
        if (response.status === 200) {
          onFilterChange(response.data);
        } else {
          throw new Error('Failed to fetch filtered expeditions');
        }
      } catch (error) {
        console.error('Error fetching filtered expeditions:', error);
      }
      
    };
  useEffect(() => {
    handleFilterChange();
    
  }, [filterStatus, filterFromDate, filterToDate, expeditions]);
  return (
    <Container className="bg-secondary text-center py-3">
      <Form className="d-flex flex-column align-items-center">
        <Form.Control
            as="select"
            className="mb-2 w-50 text-center"
            value={filterStatus}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setFilterStatus(e.target.value))}
            >
            <option value="">Выберите статус</option>
            <option value="wo">В работе</option>
            <option value="en">Завершён</option>
            <option value="ca">Отменён</option>
        </Form.Control>
        {/* <DatePicker
            className="mb-2 w-75 text-center" // Увеличение ширины
            calendarClassName="react-calendar-custom" // Стили для календаря
            value={filterFromDate ? new Date(filterFromDate) : null}
            onChange={(date: Date | null) => dispatch(setFromDate(date ? date.toISOString() : null))}
            format="dd.MM, HH:mm"
            showTimeInput
            />
            <DatePicker
            className="mb-2 w-75 text-center" // Увеличение ширины
            calendarClassName="react-calendar-custom" // Стили для календаря
            value={filterToDate ? new Date(filterToDate) : null}
            onChange={(date: Date | null) => dispatch(setToDate(date ? date.toISOString() : null))}
            format="dd.MM, HH:mm"
            showTimeInput
            /> */}
        <Form.Control
            className="mb-2 w-50 text-center"
            type="datetime-local" // Используем тип для ввода даты и времени
            value={filterFromDate || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setFromDate(e.target.value))}
            />
            <Form.Control
            className="mb-2 w-50 text-center"
            type="datetime-local" // Используем тип для ввода даты и времени
            value={filterToDate || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setToDate(e.target.value))}
            />
            <Form.Control
          className="mb-2 w-50 text-center"
          type="text"
          placeholder="Введите ник пользователя"
          value={usernameFilter}
          onChange={handleUsernameChange}
        />

      </Form>
    </Container>
  );
};

export default ExpeditionFilter;