    import React from 'react';
    // import { ObjectInt } from '../../Models/object';
    import { Container,  Card, ListGroup } from "react-bootstrap";
    import NavigationBar from "../Navbar/Navbar";
    import { useLocation } from "react-router-dom";
    import Breadcrumbs from '../Breadcrumbs/breadcrumb';


    const AboutObject: React.FC = () => {
        const location = useLocation();
        const new_obj = location.state.object

        console.log(new_obj)
        return (
            <>
                <NavigationBar />
                {/* <Breadcrumbs /> */}
                <Container fluid style={{ height: '40rem'}} className="bg-secondary d-flex align-items-center justify-content-center" >
                    <Card style={{ width: '30rem',}}>
                        <Card.Img variant="top" src={new_obj.Image_Url} />
                        <Card.Body>
                            <Card.Title>{new_obj.Name_Obj}</Card.Title>
                            <Card.Text>
                                {new_obj.Region}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>{new_obj.Opener}</ListGroup.Item>
                            <ListGroup.Item>{new_obj.Region}</ListGroup.Item>
                            <ListGroup.Item>{new_obj.Year}</ListGroup.Item>
                        </ListGroup> 

                    </Card>


                </Container>
            </>

        )
    }

    export default AboutObject