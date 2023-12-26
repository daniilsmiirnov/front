import React from "react";
import { useEffect, useState } from "react";
import Object from "./Object/object";
import { ObjectInt,ObjectExp } from "../../Models/object";
import { Container,  Row, Col,Button  } from "react-bootstrap";
import NavigationBar from "../Navbar/Navbar";
import Cart from "../Cart/cart"
import ObjectFilter1 from "../Filter/filter2";
import {mockObjects} from "../../assets/mockObjects";
import axios from "axios";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Breadcrumbs from '../Breadcrumbs/bread';     
const ObjectsList: React.FC = () => {
  const expeditions = useSelector((state: RootState) => state.expeditions.expeditions);
  const [objects, setList] = useState<ObjectInt[]>([]);
  const [filteredObjects, setFilteredObjects] = useState<ObjectInt[]>([]);
  const handleFilterChange = async (filteredObjects: ObjectInt[]) => {
    setFilteredObjects(filteredObjects);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtTokenCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
        const token = jwtTokenCookie ? jwtTokenCookie.split('=')[1] : null;
        
        const response = await axios.get<ObjectInt[]>('http://127.0.0.1:8000/object/', {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          console.log('response',response.data.objects);
          setList(response.data.objects);
          console.log('list',objects)
        } else {
          throw new Error('Failed to get data from the server');
        }
      } catch (error) {
        console.error('Error fetching data:', error);

        setList(mockObjects);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {

  //   const fetchData = async () => {

  //     try {
  //       const response = await axios.get<ObjectInt[]>("http://127.0.0.1:8000/object/");
  //       if (response.status === 200) {
  //         console.log(response);
  //         setList(response.data);
  //       } else {
  //         throw new Error("Failed to get data from the server");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setList(mockObjects);
  //     }
  //   };

  //   fetchData();
  // }, []);
  
  return (
    <>
      <NavigationBar />

      <ObjectFilter1 onFilterChange={handleFilterChange} />
      <Row>
          <Col>
            <Breadcrumbs separator="/" />
          </Col>
        </Row>
      <Container fluid className="bg-secondary">
      <Row style={{ marginLeft: "5px" }}>
          <Col sm={9}>
            <Row>
              {filteredObjects.map((obj) => (
                <Col key={obj.ID_Object} sm={4} style={{ marginBottom: "15px" }}>
                  <Object obj={obj} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col sm={3}>
            <Cart />
          </Col>
        </Row>

      </Container>
    </>
  );
  
};

export default ObjectsList;