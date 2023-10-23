import React from "react";
import { useEffect, useState } from "react";
import Object from "./Object/object";
import { ObjectInt } from "../../Models/object";
import { Container, Breadcrumb, Card, Row, Col, Nav } from "react-bootstrap";
import NavigationBar from "../Navbar/Navbar";
import Breadcrumbs from "../Breadcrumbs/breadcrumb";
import ObjectFilter from "../Filter/filter";
const ObjectsList: React.FC = () => {
  const [objects, setList] = useState<ObjectInt[]>([]);
  const [filteredObjects, setFilteredObjects] = useState<ObjectInt[]>([]);
  const handleFilterChange = (filteredObjects: ObjectInt[]) => {
    setFilteredObjects(filteredObjects);
  };
  useEffect(() => {
    console.log("hi");
    fetch("http://127.0.0.1:8000/object/")
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <NavigationBar />
      <Breadcrumbs />
      <ObjectFilter objects={objects} onFilterChange={handleFilterChange} />
      {/* <Navbar bg="dark" variant="dark" >
        <Navbar.Brand style={{ marginLeft: '50px' }} href="#home">Expedition</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="">Home</Nav.Link>
          <Nav.Link href="">About</Nav.Link>
        </Nav>
      </Navbar>*/}
      <Container fluid className="bg-secondary">
        <Row style={{ marginLeft: "50px" }}>
          {filteredObjects.map((ob) => (
            <Col sm={4} className="mb-4">
              <Object obj={ob} key={ob.ID_Object} />
            </Col>
          ))}
        </Row>
        {/* {filteredObjects.map((obj) => (
          <Col sm={4} className="mb-4">
          <Object obj={obj} key={obj.ID_Object} />
        </Col>
        ))} */}

        {/* <Col className="mb-4">
            {objects.map((ob) => (
              <Object obj={ob} key={ob.ID_Object} />
            ))}
          </Col> */}
      </Container>
    </>
  );
};

export default ObjectsList;
