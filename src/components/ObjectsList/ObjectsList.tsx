import React from "react";
import { useEffect, useState } from "react";
import Object from "./Object/object";
import { ObjectInt } from "../../Models/object";
import { Container,  Row, Col,Button  } from "react-bootstrap";
import NavigationBar from "../Navbar/Navbar";
import Cart from "../Cart/cart"
import Breadcrumbs from "../Breadcrumbs/breadcrumb";
import ObjectFilter1 from "../Filter/filter2";
import ObjectFilter from "../Filter/filter";
import {mockObjects} from "../../assets/mockObjects";
import axios from "axios";
const ObjectsList: React.FC = () => {
  const [objects, setList] = useState<ObjectInt[]>([]);
  const [filteredObjects, setFilteredObjects] = useState<ObjectInt[]>([]);
  const handleFilterChange = (filteredObjects: ObjectInt[]) => {
    setFilteredObjects(filteredObjects);
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get<ObjectInt[]>("http://127.0.0.1:8000/object/");
        if (response.status === 200) {
          console.log(response);
          setList(response.data);
        } else {
          throw new Error("Failed to get data from the server");
        }
      } catch (error) {
        console.error(error);
        setList(mockObjects);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <NavigationBar />
      {/* <Breadcrumbs /> */}
      <ObjectFilter objects={objects} onFilterChange={handleFilterChange} />
      

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