/*eslint-disable*/
import React from "react";
import { Button, Modal } from "reactstrap";
import { Link, withRouter } from 'react-router-dom';

import ModalPoliticas from '../Modals/Politicas';
// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {

  return (
    <footer className="footer">
      <Container>
        <nav>
          <ul>
            <li>
              <Link
                href="http://animalfriendblog.gearhostpreview.com/"
                target="_blank"
              >
                Sobre nosotros
              </Link>
            </li>

            <li>

          <ModalPoliticas></ModalPoliticas>
            </li>
                        <li>
              <Link
              target="_blank"
              href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAABtOqqlUNjU2RjhCN0VYM1I5QkVTSFg0NUVQV09QUi4u">Danos tu opinión</Link>
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
