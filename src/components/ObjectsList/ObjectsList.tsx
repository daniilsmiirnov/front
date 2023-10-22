import React from "react";
import { useEffect, useState } from "react";
import Object from "./Object/object";
import { ObjectInt } from "../../Models/object";
import { Container, Navbar, Breadcrumb, Card, Row, Col, Nav } from 'react-bootstrap';
const ObjectsList: React.FC = () => {
  const [objects, setList] = useState<ObjectInt[]>([]);

  useEffect(() => {
    console.log("hi");
    fetch("http://127.0.0.1:8000/object/")
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
     <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">My Website</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
      </Navbar>
      <Container fluid className="bg-secondary">

        <h1>Список карточек</h1>
        <Row>
        <Col md={4} className="mb-4">
        {objects.map((ob) => (
          <Object obj={ob} key={ob.ID_Object} />
        ))}
         </Col>
        </Row>
      </Container>
    </>
  );
};

export default ObjectsList;
