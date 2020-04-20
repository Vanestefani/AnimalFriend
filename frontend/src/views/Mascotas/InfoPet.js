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
              <i class="fas fa-birthday-cake"></i>
              <b>Fecha de Nacimiento :</b>
              <p href="#" class="badge badge-primary">
                10/02/2019
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-palette"></i>
              <b>Color principal :</b>
              <p href="#" class="badge badge-primary">
                Amarillo
              </p>

            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i class="fas fa-heart"></i>
              <b>Situación sentimental :</b>
              <p href="#" class="badge badge-primary">
                Soltero
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-microchip"></i>
              <b>N° Chip :</b>
              <p href="#" class="badge badge-primary">
                Ninguno
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-user-md"></i>
              <b> Estelerizado:</b>
              <p href="#" class="badge badge-primary">
                No
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-exclamation-triangle"></i>
              <b> Peligroso:</b>
              <p href="#" class="badge badge-primary">
                No
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i class="fas fa-ruler"></i>
            <b> Tamaño:</b>
              <p href="#" class="badge badge-primary">
               5m
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i class="fas fa-notes-medical"></i>
            <b> Alergias:</b>
              <p href="#" class="badge badge-primary">
               No
              </p>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i class="fas fa-dragon"></i>
            <b> Personalidad:</b>
              <p href="#" class="badge badge-primary">
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
