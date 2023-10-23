import React, { useState } from 'react';

interface ObjectInt {
  ID_Object: number;
  Name_Obj: string;
  Region: string;
  Year: number;
  Opener: string;
  Status: string;
  Image_Url: string;
}

interface FilterProps {
  objects: ObjectInt[];
  onFilterChange: (filteredObjects: ObjectInt[]) => void;
}

const ObjectFilter: React.FC<FilterProps> = ({ objects, onFilterChange }) => {
  const [filter, setFilter] = useState<string>('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  React.useEffect(() => {
    const filteredObjects = objects.filter((obj) =>
      obj.Name_Obj.toLowerCase().includes(filter.toLowerCase())
    );
    onFilterChange(filteredObjects);
  }, [filter, objects, onFilterChange]);

  return (
    <div className='bg-secondary'>
      <input type="text" placeholder="Search by Obj_Name" value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default ObjectFilter;
