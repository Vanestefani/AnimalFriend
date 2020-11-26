import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import AuthContext from "../../context/autenticacion/authContext";
import UsuariosItem from "./usuariosItem";

function SearchUser() {
  const authContext = useContext(AuthContext);
  const { usuarios, alluser } = authContext;
  const [modal, setModal] = React.useState(false);
  useEffect(() => {
    alluser();
  }, [usuarios]);
  const [busqueda, setbusqueda] = useState({
    search: "",
  });
  const { search } = busqueda;
  const onChangeSearch = (e) => {
    setbusqueda({
      ...busqueda,
      search: e.target.value,
    });
  };
  const items = usuarios
    .filter((data) => {
      if (search == "") return data;
      else if (
        data.nombre.toLowerCase().includes(search.toLowerCase()) ||
        data.email.toLowerCase().includes(search.toLowerCase())
      ) {
        return data;
      }
    })
    .map((data) => {
      return <UsuariosItem key={data._id} data={data}></UsuariosItem>;
    });

  return (
    <>
      <Button small onClick={() => setModal(true)}>
        <i class="fas fa-search"></i>
      </Button>
      <Modal isOpen={modal} toggle={() => setModal(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
        </div>
        <ModalBody>
          <div>
            <h4>Buscar usuarios</h4>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-play"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                name="search"
                type="search"
                id="search"
                placeholder="Buscar anuncios"
                value={search}
                onChange={onChangeSearch}
              ></Input>
            </InputGroup>
          </div>
          {items.length === 0 ? <p>No hay usuarios </p> : items}
        </ModalBody>
        <div className="modal-footer">
          <Button color="danger" type="button" onClick={() => setModal(false)}>
            Cerrar
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default SearchUser;
