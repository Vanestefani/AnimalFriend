import React from "react";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

import { Link } from "react-router-dom";

function Mascota() {
  return (
    <>
      <div className="section section-team text-center">
        <Container>

          <div className="team">
            <Row>
              <Col md="6 ">
                <div className="team-player">
                  <img
                    alt="..."
                    className="rounded-circle img-fluid img-raised"
                    src={require("../../assets//img/avatar.jpg")}
                  ></img>
                  <h4 className="title">Nombre de mascota</h4>
                  <span className="badge badge-primary">Especie</span>
                  <br></br>
                  <Button
                    className="btn-info "
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="far fa-eye"></i>
                    Ver más
                  </Button>
                </div>
              </Col>
              <Col md="6">
                <div className="team-player">
                  <img
                    alt="..."
                    className="rounded-circle img-fluid img-raised"
                    src={require("../../assets//img/ryan.jpg")}
                  ></img>
                     <h4 className="title">Nombre de mascota</h4>
                  <span className="badge badge-primary">Especie</span>
                  <br></br>
                  <Button
                    className="btn-info "
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="far fa-eye"></i>
                    Ver más
                  </Button>
                </div>
              </Col>
              <Col md="6">
                <div className="team-player">
                  <img
                    alt="..."
                    className="rounded-circle img-fluid img-raised"
                    src={require("../../assets//img/eva.jpg")}
                  ></img>
                      <h4 className="title">Nombre de mascota</h4>
                  <span className="badge badge-primary">Especie</span>
                  <br></br>
                  <Button
                    className="btn-info "
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="far fa-eye"></i>
                    Ver más
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Mascota;
