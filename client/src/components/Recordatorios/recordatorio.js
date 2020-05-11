import React, { useContext, useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import {
  UncontrolledDropdown,
  DropdownToggle,
  CardHeader,
  Card,
  CardBody,
  Container,
  DropdownMenu,
  DropdownItem,
  CardTitle,
  CardFooter,
  Modal,
  Input,
  ModalBody,
  Form,
  Button,
  Badge,
} from "reactstrap";
import RContext from "../../context/recordatorios/recordatoriosContex";
import AlertaContext from "../../context/alertas/alertaContext";
import Like from "./Likes";
function Post(props) {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  const rContext = useContext(RContext);

  const { deleteRecordatorios, actualizarRecordatorios } = rContext;

  const [modalEditar, setModaPost] = useState(false);

  const [posteditor, setEditarPost] = useState({
    texto: props.recordatorio.descripcion,
  });

  const [comentarios, setcomentarios] = useState({
    comentario: "",
  });

  const handleChange = (e) => {
    setEditarPost({
      ...posteditor,
      texto: [e.target.value],
    });
  };

  return (
    <>
      <Modal isOpen={modalEditar} toggle={() => setModaPost(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModaPost(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">Editar Post</h2>
        </div>
        <ModalBody>
          <Form noValidate autoComplete="off">
            <Input
              type="textarea"
              multiline
              margin="normal"
              rowsMax="5"
              name="texto"
              id="texto"
              value={posteditor.texto}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary">
              Editar
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <Container className="card-general">
        <FormGroup check>
          <Label check>
            <Input defaultValue="" type="checkbox"></Input>
            Option one is this and that—be sure to include why it's great
            <span className="form-check-sign">
              <span className="check"></span>
            </span>
            <span className="badge badge-primary">10/04/2020</span>
          </Label>
        </FormGroup>
      </Container>
      <Container className="card-general">
        <FormGroup check>
          <Label check>
            <Input defaultValue="" type="checkbox"></Input>
            Option one is this and that—be sure to include why it's great
            <span className="form-check-sign">
              <span className="check"></span>
            </span>
            <span className="badge badge-primary">10/04/2020</span>
          </Label>
        </FormGroup>
      </Container>
      <Container className="card-general">
        <FormGroup check>
          <Label check>
            <Input defaultValue="" type="checkbox"></Input>
            Option one is this and that—be sure to include why it's great
            <span className="form-check-sign">
              <span className="check"></span>
            </span>
            <span className="badge badge-primary">10/04/2020</span>
          </Label>
        </FormGroup>
      </Container>
    </>
  );
}

export default Post;
