import React, { useState, useContext } from "react";
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
} from "reactstrap";

import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import "react-image-crop/dist/ReactCrop.css";
function FotoPerfil(props) {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const imageInputRef = React.useRef();
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
  const [state, setstate] = useState({
    Errorfoto: { valido: true, mensaje: "" },
  });
  const [photo, guardararchivophoto] = useState(null);
  const validate = () => {
    let isError = false;

    if (photo === undefined || photo === null || photo === "") {
      if (state) {
        state.Errorfoto.valido = false;
        state.Errorfoto.mensaje = "(Debe subir una imagen)";
      }
    } else {
      if (state) state.Errorfoto.valido = true;
    }
    if (state) {
      if (!state.Errorfoto.valido) {
        isError = true;
      } else {
        isError = false;
      }
    }

    return isError;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (!err) {
      let userid = props.usuario._id;

      let formData = new FormData();
      formData.append("imagen", photo, photo.name);
      console.log(photo.name);
      props.changefoto(formData);
      setstate({
        Errorfoto: { valido: true, mensaje: "" },
      });
      guardararchivophoto(null);
      imageInputRef.current.value = "";
      setModalP(false);

    } else {
      setFirstFocus(true);
      validate();
    }
  };
  const [modalP, setModalP] = React.useState(false);
  return (
    <>
      <Button small onClick={() => setModalP(true)}>
        <i className="fas fa-camera"></i>
      </Button>

      <Modal isOpen={modalP} toggle={() => setModalP(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModalP(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">Cambiar foto de perfil</h2>
        </div>
        <ModalBody>
          <div>
            <div className="upload-btn-wrapper">
              <span className="m-2 p-2 info">
                <Input
                  accept={acceptedFileTypes}
                  onChange={(e) => guardararchivophoto(e.target.files[0])}
                  id="photo"
                  name="photo"
                  type="file"
                  ref={imageInputRef}
                ></Input>
                <i className="fas fa-camera"></i>
              </span>

              {state != undefined ? (
                state.Errorfoto.valido ? (
                  ""
                ) : (
                  <span className="text-muted text-danger">
                    {state.Errorfoto.mensaje}
                  </span>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </ModalBody>
        <div className="modal-footer">
          <Button color="primary" type="button" onClick={handleSubmit}>
            <i className="fas fa-paper-plane"></i> Enviar
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default FotoPerfil;
