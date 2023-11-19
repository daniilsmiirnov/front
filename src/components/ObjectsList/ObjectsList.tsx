import React from "react";
import { useEffect, useState } from "react";
import Object from "./Object/object";
import { ObjectInt } from "../../Models/object";
import { Container,  Row, Col  } from "react-bootstrap";
import NavigationBar from "../Navbar/Navbar";
import Breadcrumbs from "../Breadcrumbs/breadcrumb";
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
    axios.get("http://127.0.0.1:8000/object/").then(response=>{
      if (response.status ===200){
        console.log(response);
        setList(response.data);

      }
      else{
        throw new Error('Failed get data from server');
      }
    })
    .catch(error=>{
      console.error(error);
      setList(mockObjects);
    });
  },[]);

  return (
    <>
      <NavigationBar />
      {/* <Breadcrumbs /> */}
      <ObjectFilter objects={objects} onFilterChange={handleFilterChange} />

      <Container fluid className="bg-secondary">
        <Row style={{ marginLeft: "50px" }}>
          {filteredObjects.map((ob) => (
            <Col sm={4} className="mb-4" >
              <Object obj={ob} key={ob.ID_Object} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ObjectsList;
