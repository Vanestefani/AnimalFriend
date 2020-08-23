import React, { useEffect, useContext } from "react";
import HomeNarbar from "../components/Navbars/homeNarbar";
import DefaultFooter from "../components/Footers/DefaultFooter.js";
import VerticalMenu from "../components/Navbars/VerticalMenu";
import ListMascotas from "../components/Listas/ListMascotas";
import SubMenu from "../components/Navbars/SubMenu";

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
          <Row>
            <Col md="3">
              <VerticalMenu></VerticalMenu>
              <ListMascotas></ListMascotas>
            </Col>
            <Col md="9">
              <SubMenu></SubMenu>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h3>Explorar</h3>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  {usuarios
                    ? usuarios.map((u) => (
                        <div>
                          <Col md="4">
                            <Card>
                              <CardImg
                                top
                                width="80px"
                                height="100px"
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default ExplorarPage;
