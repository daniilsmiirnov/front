import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbsProps {
  separator?: string;
  objectName?: string; // Новое свойство для названия объекта
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ separator = '/', objectName }) => {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    let breadcrumbPath = '';

    return (
      <div className="bg-secondary text-white p-2">
        <span>
          <Link to="/" className="text-white text-decoration-none underline">Объекты</Link>
        </span>
        {paths.map((path, index) => {
          breadcrumbPath += `/${path}`;
          const isLast = index === paths.length - 1;
          return (
            <span key={path}>
              {isLast ? (
                ` ${separator} ${objectName}` // Отображаем название объекта
              ) : (
                <Link to={breadcrumbPath} className="text-white text-decoration-none underline">{`${separator} ${path}`}</Link>
              )}
            </span>
          );
        })}
      </div>
    );
  };

  return <div>{generateBreadcrumbs()}</div>;
};

export default Breadcrumbs;
