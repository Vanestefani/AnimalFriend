import React, { useEffect, useContext } from "react";
import HomeNarbar from "../components/Navbars/homeNarbar";
import DefaultFooter from "../components/Footers/DefaultFooter.js";

import { Link } from "react-router-dom";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
  CardImg,
  CardBody,
  CardSubtitle,
} from "reactstrap";
import AuthContext from "../context/autenticacion/authContext";

function ExplorarPage() {
  const AContext = useContext(AuthContext);
  const { alluser, usuarios } = AContext;

  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  useEffect(() => {
    alluser();
  }, [usuarios]);
  return (
    <>
      <HomeNarbar></HomeNarbar>
      <div className="wrapper content_home">
        <Container>

          <Card>
            <CardHeader>
              <CardTitle>
                <h1 className="text-center">Descubre personas</h1>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
              {usuarios
                ? usuarios.map((u) => (
                    <div>
                      <Col md="4">
                        <Card>
                          <CardImg

                            top width="100%"
                            src={u.fotoPerfil}
                            alt="Card image cap"
                          />
                          <CardBody>
                            <CardTitle>{u.nombre}</CardTitle>
                            <CardSubtitle>{u.pais}</CardSubtitle>

                            <Link
                              to={"/perfil/" + u._id}
                              className="btn btn-info"
                            >
                              Ver más
                            </Link>
                          </CardBody>
                        </Card>
                      </Col>
                    </div>
                  ))
                : ""}
                </Row>
            </CardBody>
          </Card>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default ExplorarPage;
