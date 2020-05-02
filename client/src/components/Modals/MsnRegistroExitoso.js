/*eslint-disable*/
import React from "react";
import { Link, withRouter } from 'react-router-dom';

import { Button, Container, Modal, ModalBody, Row, Col } from "reactstrap";

function ModalMsnRegistroExitoso() {
  const [modalMsnRegistroExitoso, setModal1] = React.useState(false);
  return (
    <>
      <Link className="link-a" onClick={() => setModal1(true)}>
        Políticas
      </Link>

      <Modal isOpen={modalMsnRegistroExitoso} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">Gracias por registrarte</h2>
        </div>
        <ModalBody>
          <p className="text-justify">
            Para poner finalizar tu registro, es necesario verificar tu cuenta,
            te hemos enviado un correo con un enlace solo tienes que ingresar a
            él y tu cuenta se activara.
          </p>
          <p className="text-justify" F>
            Si no recibes este email en unos minutos, comprueba que no esté en
            la bandeja de Spam o correo no deseado .
          </p>
        </ModalBody>
        <div className="modal-footer">
          <Button color="danger" type="button" onClick={() => setModal1(false)}>
            Cerrar
          </Button>
        </div>
      </Modal>
    </>
  );
}
export default ModalMsnRegistroExitoso;
