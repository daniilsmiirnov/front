import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { ObjectInt } from '../../Models/object';
import { Form } from 'react-bootstrap';
import { RootState } from '../../store/store';
import { setFilterName, setFilterYear, setFilterOpener } from '../../store/FilterObjSlice';

interface FilterProps {
  onFilterChange: (filteredObjects: ObjectInt[]) => void;
}

const ObjectFilter1: React.FC<FilterProps> = ({ onFilterChange }) => {
  const filterName = useSelector((state: RootState) => state.filterObj.filterName);
  const filterYear = useSelector((state: RootState) => state.filterObj.filterYear);
  const filterOpener = useSelector((state: RootState) => state.filterObj.filterOpener);
  const dispatch = useDispatch();

  useEffect(() => {
    handleFilterChange();
  }, [filterName, filterYear, filterOpener]);

  const handleFilterChange = async () => {
    try {
      const response: AxiosResponse<ObjectInt[]> = await axios.get('http://127.0.0.1:8000/object/', {
        params: {
          name: filterName,
          year: filterYear,
          opener: filterOpener,
        },
      });

      if (response.status === 200) {
        onFilterChange(response.data);
      } else {
        throw new Error('Failed to get filtered data from the server');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-secondary text-center py-3">
      <Form className="d-flex flex-column align-items-center">
        <Form.Control
          className="mb-2 w-50 text-center"
          type="text"
          placeholder="Название объекта"
          value={filterName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setFilterName(e.target.value))}
        />
        <Form.Control
          className="mb-2 w-50 text-center"
          type="text"
          placeholder="Год"
          value={filterYear}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setFilterYear(e.target.value))}
        />
        <Form.Control
          className="mb-2 w-50 text-center"
          type="text"
          placeholder="Лидер"
          value={filterOpener}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setFilterOpener(e.target.value))}
        />
      </Form>
    </div>
  );
};

export default ObjectFilter1;
