/*eslint-disable*/
import React from "react";
import ModalPoliticas from "../Modals/Politicas";
// reactstrap components
import { Container } from "reactstrap";
import { Link, withRouter } from "react-router-dom";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="http://animalfriendblog.gearhostpreview.com/"
                target="_blank"
              >
                Sobre nosotros
              </a>
            </li>

            <li>
              <ModalPoliticas></ModalPoliticas>
            </li>
            <li>
              <Link
                target="_blank"
                href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAABtOqqlUNjU2RjhCN0VYM1I5QkVTSFg0NUVQV09QUi4u"
              >
                Danos tu opinión
              </Link>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Animalfriend
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
