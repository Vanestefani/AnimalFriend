import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,Row
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";

function LoginPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="green">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../../assets//img/pet-fondo.jfif") + ")",

          }}
        ></div>
        <div className="content">
          <Container>

            <Col className="ml-auto mr-auto col-md-12" md="12">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="isotipo de animalfriend"
                        src={require("../../assets//img/Logo.svg")}

                     ></img>
                    </div>
                    <div class="social-line"><a href="#pablo" class="btn-neutral btn-icon btn-circle btn btn-facebook">
                      <i class="fab fa-facebook-square"></i>
                      </a>
                      <a href="#pablo" class="btn-neutral btn-icon btn-circle btn btn-twitter btn-lg ">
                        <i class="fab fa-twitter"></i></a>
                        <a href="#pablo" class="btn-neutral btn-icon btn-circle btn btn-google">
                          <i class="fab fa-google-plus"></i></a>
                          </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i class="fas fa-envelope"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i class="fas fa-key"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Contraseña"
                        type="text"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                    <Button
                      block
                      className="btn-round  "
                      color="primary"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                    <b>  Iniciar Sesión </b>
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <Link
                          className="link"
                          to="/crear-cuenta"

                          tag={Link}
                        >
                          Crear cuenta
                        </Link>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          ¿Olvidaste tu contraseña?
                        </a>
                      </h6>
                    </div>
                  </CardBody>

                </Form>
              </Card>
            </Col>

          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default LoginPage;
