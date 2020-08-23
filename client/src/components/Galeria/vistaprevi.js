import React from "react";

// reactstrap components
import { CardHeader, Container, Row, Col, Card, CardTitle, CardFooter} from "reactstrap";
import { Link } from "react-router-dom";

// core components

function Vistaprevi() {
  return (
    <>
      <Card>
        <Container className="container m-2">
          <Row>
            <CardHeader className="container">
              <CardTitle className="title-up">
                <br></br>
                <h3 className="text-center">
                  <b>Fotos</b>
                </h3>
              </CardTitle>
            </CardHeader>
            <Col md="12 " className="p-3 ">
              <Link md="4" to="#" >
                <img
                  src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(145).jpg"
                  alt="placeholder"
                  className="img-fluid"
                  width="50px"
                ></img>
              </Link>
              <Link md="4" to="#">
                <img
                  src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(145).jpg"
                  alt="placeholder"
                  className="img-fluid"
                  width="50px"
                ></img>
              </Link>
              <Link md="4" to="#">
                <img
                  src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(145).jpg"
                  alt="placeholder"
                  className="img-fluid"
                  width="50px"
                ></img>
              </Link>
              <Link md="4" to="#">
                <img
                  src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(145).jpg"
                  alt="placeholder"
                  className="img-fluid"
                  width="50px"
                ></img>
              </Link>
              <Link md="4" to="#">
                <img
                  src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(145).jpg"
                  alt="placeholder"
                  className="img-fluid"
                  width="50px"
                ></img>
              </Link>
              <Link md="4" to="#">
                <img
                  src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(145).jpg"
                  alt="placeholder"
                  className="img-fluid"
                  width="50px"
                ></img>
              </Link>
              <Link md="4" to="#">
                <img
                  src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(145).jpg"
                  alt="placeholder"
                  className="img-fluid"
                  width="50px"
                ></img>
              </Link>
              <Link md="4" to="#">
                <img
                  src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(145).jpg"
                  alt="placeholder"
                  className="img-fluid"
                  width="50px"
                ></img>
              </Link>
              <CardFooter>
          <Link className="pull-right">Ver más</Link>
          </CardFooter>
            </Col>
          </Row>
        </Container>
      </Card>
    </>
  );
}

export default Vistaprevi;
