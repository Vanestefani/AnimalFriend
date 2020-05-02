import React from "react";

// reactstrap components
import { NavLink, Nav, Container, Card } from "reactstrap";

import { Link } from "react-router-dom";

function InfoPet() {
  return (
    <>
      <Card className="card-general">
        <Container>
          <Nav className="flex-column" tag="nav">
            <NavLink
              className="active"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <img
                src={require("../../assets/img/undraw_happy_music_g6wc.png")}
                className="rounded-circle FotoUser "
              ></img>

              <p className="text-center">Nombre de mascota</p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-birthday-cake"></i>
              <b>Fecha de Nacimiento :</b>
              <p href="#" className="badge badge-primary">
                10/02/2019
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-palette"></i>
              <b>Color principal :</b>
              <p href="#" className="badge badge-primary">
                Amarillo
              </p>

            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i className="fas fa-heart"></i>
              <b>Situación sentimental :</b>
              <p href="#" className="badge badge-primary">
                Soltero
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-microchip"></i>
              <b>N° Chip :</b>
              <p href="#" className="badge badge-primary">
                Ninguno
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-user-md"></i>
              <b> Estelerizado:</b>
              <p href="#" className="badge badge-primary">
                No
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-exclamation-triangle"></i>
              <b> Peligroso:</b>
              <p href="#" className="badge badge-primary">
                No
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i className="fas fa-ruler"></i>
            <b> Tamaño:</b>
              <p href="#" className="badge badge-primary">
               5m
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i className="fas fa-notes-medical"></i>
            <b> Alergias:</b>
              <p href="#" className="badge badge-primary">
               No
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i className="fas fa-dragon"></i>
            <b> Personalidad:</b>
              <p href="#" className="badge badge-primary">
             Alegre
              </p>
            </NavLink>
          </Nav>
        </Container>
      </Card>
    </>
  );
}

export default InfoPet;
