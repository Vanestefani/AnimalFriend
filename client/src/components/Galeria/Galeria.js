import React from "react";

// reactstrap components
import { NavLink, Nav, Container, Card, Row, Col ,CardTitle} from "reactstrap";

import { Link } from "react-router-dom";

function Galeria() {
  return (
    <>
   <Card

   >
       <CardTitle><h3>Fotos</h3></CardTitle>
       <Row className="container">
           <Col md="4">
               <img className="img-thumbnail" src={require("../../assets/img/undraw_happy_music_g6wc.png")}/>
           </Col>
           <Col md="4">
               <img className="img-thumbnail" src={require("../../assets/img/undraw_happy_music_g6wc.png")}/>
           </Col>
           <Col md="4">
               <img className="img-thumbnail" src={require("../../assets/img/undraw_happy_music_g6wc.png")}/>
           </Col>
           <Col md="4">
               <img className="img-thumbnail" src={require("../../assets/img/undraw_happy_music_g6wc.png")}/>
           </Col>
       </Row>
   </Card>
    </>
  );
}

export default Galeria;
