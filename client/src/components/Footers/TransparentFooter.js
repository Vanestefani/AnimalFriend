/*eslint-disable*/
import React from "react";

import { Link } from "react-router-dom";

import ModalPoliticas from "../Modals/Politicas";
// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer">
      <Container>
        <nav>
          <ul>
            <li>
              <ModalPoliticas></ModalPoliticas>
            </li>
            <li>
              <Link
                target="_blank"
                to="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAABtOqqlUNjU2RjhCN0VYM1I5QkVTSFg0NUVQV09QUi4u"
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

export default TransparentFooter;
