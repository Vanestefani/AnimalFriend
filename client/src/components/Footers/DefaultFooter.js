/*eslint-disable*/
import React from "react";
import ModalPoliticas from '../Modals/Politicas';
// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
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
              <a
              target="_blank"
              href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAABtOqqlUNjU2RjhCN0VYM1I5QkVTSFg0NUVQV09QUi4u">Danos tu opinión</a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Animalfriend
        </div>
      </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
