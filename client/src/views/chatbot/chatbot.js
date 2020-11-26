import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
// core components
import HomeNarbar from "../../components/Navbars/homeNarbar";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import VerticalMenu from "../../components/Navbars/VerticalMenu";

import ListRecordatorios from "../../components/Recordatorios/ListRecordatorios";
function Home() {
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  return (
    <>
      <HomeNarbar></HomeNarbar>
      <div className="wrapper content_home">
        <Container>
          <Row>
            <Col md="6">
              <iframe
                allow="microphone;"
                width="100%"
                height="500px"
                src="https://console.dialogflow.com/api-client/demo/embedded/0f1f0038-051e-4ffc-9d29-7f92e0f07e12"
              ></iframe>
            </Col>
            <Col md="6">
            <img
                  width="400px"
                  alt="..."
                  src={require("../../assets/img/dog_walking.svg")}
                ></img>
            </Col>
          </Row>{" "}
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Home;
