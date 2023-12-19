import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setFilterStatus, setFromDate, setToDate } from '../../store/FilterExpSlice';
import { Container, Form } from 'react-bootstrap';

interface ExpeditionFilterProps {
  onFilterChange: (filteredExpeditions: any[]) => void;
}

const ExpeditionFilter: React.FC<ExpeditionFilterProps> = ({ onFilterChange }) => {
  const filterStatus = useSelector((state: RootState) => state.expeditionFilter.Status);
  const filterFromDate = useSelector((state: RootState) => state.expeditionFilter.fromDate);
  const filterToDate = useSelector((state: RootState) => state.expeditionFilter.toDate);
  const expeditions = useSelector((state: RootState) => state.expeditions.expeditions);
  const dispatch = useDispatch();

  useEffect(() => {
    handleFilterChange();
  }, [filterStatus, filterFromDate, filterToDate, expeditions]);

  const handleFilterChange = () => {
    let filteredExpeditions = expeditions.filter((expedition) => {
      let isValid = true;
      if (filterStatus && expedition.Status !== filterStatus) {
        isValid = false;
      }
      if (filterFromDate && expedition.DateStart < filterFromDate) {
        isValid = false;
      }
      if (filterToDate && expedition.DateEnd > filterToDate) {
        isValid = false;
      }
      return isValid;
    });

    onFilterChange(filteredExpeditions);
  };

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
            <option value="in">Введён</option>
            <option value="wo">В работе</option>
            <option value="en">Завершён</option>
            <option value="ca">Отменён</option>
            <option value="de">Удалён</option>
        </Form.Control>
        <Form.Control
          className="mb-2 w-50 text-center"
          type="text"
          placeholder="Начальная дата"
          value={filterFromDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setFromDate(e.target.value))}
        />
        <Form.Control
          className="mb-2 w-50 text-center"
          type="text"
          placeholder="Конечная дата"
          value={filterToDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setToDate(e.target.value))}
        />
      </Form>
    </Container>
  );
};

export default ExpeditionFilter;
