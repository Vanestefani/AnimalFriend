import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import Gato from "./breed/gato";
import Perro from "./breed/perro";
import Ave from "./breed/ave";
import Barnyard from "./breed/barnyard";
import Caballo from "./breed/Caballo";
import Reptil from "./breed/Reptil";
import Roedor from "./breed/Roedor";
import MascotasContext from "../../context/mascotas/mascotasContext";
import AuthContext from "../../context/autenticacion/authContext";

import "react-image-crop/dist/ReactCrop.css";

function Mascota(props) {
  //imgen parametros
  const imageInputRef = React.useRef();
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";

  //context
  const mContext = useContext(MascotasContext);
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const { actualizarMascotas } = mContext;
  //state mascota
  const [Fmascota, guardarMascota] = useState({
    nombreMascota: props.mascota.nombre,
    especie: props.mascota.especie,
    raza: props.mascota.raza,
    generoMascota: props.mascota.genero,
    fechanacimiento: props.mascota.fecha_nacimiento,
    colorPrincipal: props.mascota.color,
  });
  const {
    nombreMascota,
    especie,
    raza,
    generoMascota,
    fechanacimiento,
    colorPrincipal,
  } = Fmascota;
  //error state
  const [seterrores] = useState(false);

  //focus
  const [nombreMascotaFocus, setnombreMascotaFocus] = React.useState(false);
  const [especieFocus, setespecieFocus] = React.useState(false);
  const [razaFocus, setrazaFocus] = React.useState(false);
  const [generoMascotaFocus, setgeneroMascotaFocus] = React.useState(false);
  const [fechanacimientoFocus, setfechanacimientoFocus] = React.useState(false);
  const [colorPrincipalFocus, setcolorPrincipal] = React.useState(false);
  const [errores, setErrores] = React.useState({
    ErrornombreMascota: { valido: true, mensaje: "" },
    Errorespecie: { valido: true, mensaje: "" },
    Errorraza: { valido: true, mensaje: "" },
    Errorgenero: { valido: true, mensaje: "" },
    Errorfechanacimiento: { valido: true, mensaje: "" },
    ErrorcolorPrincipal: { valido: true, mensaje: "" },
    Errorfoto: { valido: true, mensaje: "" },
  });

  //modal
  const [modalMascotas, setModal1] = React.useState(false);
  //previw imagen
  let imgPreview = (
    <img
      width="100px"
      src={require("../../assets/img/undraw_Cautious_dog_q83f.png")}
      alt=""
    />
  );
  const onChange = (e) => {
    guardarMascota({
      ...Fmascota,
      [e.target.name]: e.target.value,
    });
    getBreeds(especie);
  };

  let breed;
  if (Fmascota.especie === "Gato") {
    breed = <Gato></Gato>;
  } else if (Fmascota.especie === "Perro") {
    breed = <Perro></Perro>;
  } else if (Fmascota.especie === "Ave") {
    breed = <Ave></Ave>;
  } else if (Fmascota.especie === "Animal de corral") {
    breed = <Barnyard></Barnyard>;
  } else if (Fmascota.especie === "Reptil") {
    breed = <Reptil></Reptil>;
  } else if (Fmascota.especie === "Roedor") {
    breed = <Roedor></Roedor>;
  } else if (Fmascota.especie === "Caballo") {
    breed = <Caballo></Caballo>;
  }

  const [fotoMascotaFocus, setfotoMascota] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    e.target.className += " was-validated";
    let userid = usuario._id;

    if (!err) {
      actualizarMascotas({
        nombre: nombreMascota,
        especie: especie,
        raza: raza,
        genero: generoMascota,
        fecha_nacimiento: fechanacimiento,
        color: colorPrincipal,
        propietario: userid,
        mascotaId: props.mascota._id,
      });
      setModal1(false);
    } else {
      setnombreMascotaFocus(true);
      validate();
    }
  };

  //cargar razaas
  const getBreeds = (especie) => {
    if (Fmascota.especie) {
    }
  };
  const validate = () => {
    let isError = false;
    const maximo = new RegExp("[a-zA-Z ]{3,19}$");

    if (maximo.test(Fmascota.nombreMascota) === false) {
      errores.ErrornombreMascota.valido = false;
      errores.ErrornombreMascota.mensaje =
        "(Por favor ingrese un nombre valido)";
    } else {
      errores.ErrornombreMascota.valido = true;
    }
    if (Fmascota.especie.length < 1) {
      errores.Errorespecie.valido = false;
      errores.Errorespecie.mensaje = "(Debe elegir un campo)";
    } else {
      errores.Errorespecie.valido = true;
    }
    if (Fmascota.raza.length < 1) {
      errores.Errorraza.valido = false;
      errores.Errorraza.mensaje = "(Debe elegir un campo)";
    } else {
      errores.Errorraza.valido = true;
    }
    if (Fmascota.generoMascota.length < 1) {
      errores.Errorgenero.valido = false;
      errores.Errorgenero.mensaje = "(Debe elegir un campo)";
    } else {
      errores.Errorgenero.valido = true;
    }
    if (Fmascota.fechanacimiento.length < 1) {
      errores.Errorfechanacimiento.valido = false;
      errores.Errorfechanacimiento.mensaje = "(Debe elegir un campo)";
    } else {
      errores.Errorfechanacimiento.valido = true;
    }
    if (Fmascota.colorPrincipal.length < 1) {
      errores.ErrorcolorPrincipal.valido = false;
      errores.ErrorcolorPrincipal.mensaje = "(Debe elegir un campo)";
    } else {
      errores.ErrorcolorPrincipal.valido = true;
    }
    if (
      !errores.Errorfoto.valido ||
      !errores.ErrornombreMascota.valido ||
      !errores.Errorespecie.valido ||
      !errores.Errorraza.valido ||
      !errores.Errorgenero.valido ||
      !errores.Errorfechanacimiento.valido ||
      !errores.ErrorcolorPrincipal.valido
    ) {
      isError = true;
    } else {
      isError = false;
    }
    return isError;
  };
  return (
    <>
      <Col md="6">
        <div className="team-player">
          <img
            alt="..."
            className="rounded-circle img-fluid img-raised"
            src={props.mascota.foto}
          ></img>
          <h4 className="title">{props.mascota.nombre}</h4>
          <span className="badge badge-primary">{props.mascota.especie}</span>
          <br></br>
          <Link
            to={"/perfil-mascota/" + props.mascota._id}
            className="btn btn-info btn-sm"
          >
            <i className="far fa-eye"></i>
          </Link>
          {props.mascota.propietario._id == props.usuario._id ? (
            <Button small onClick={() => setModal1(true)}>
              Editar
            </Button>
          ) : (
            " "
          )}
        </div>
      </Col>
      <Modal isOpen={modalMascotas} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">Datos de mascota</h2>
        </div>
        <ModalBody>
          <div>
            <h4>Información de mascota</h4>
            <InputGroup
              className={
                "no-border input-lg" +
                (nombreMascotaFocus ? " input-group-focus" : "")
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-paw"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                className={
                  errores.ErrornombreMascota
                    ? errores.ErrornombreMascota.valido
                      ? ""
                      : "is-invalid form-control-danger form-control"
                    : ""
                }
                placeholder="Nombre mascota"
                type="text"
                onFocus={() => setnombreMascotaFocus(true)}
                onBlur={() => setnombreMascotaFocus(false)}
                id="nombreMascota"
                name="nombreMascota"
                onChange={onChange}
                defaultValue={Fmascota.nombreMascota}
                required
              ></Input>
            </InputGroup>

            {!errores.ErrornombreMascota.valido ? (
              <span className="text-muted">
                {errores.ErrornombreMascota.mensaje}
              </span>
            ) : (
              ""
            )}
            <Row>
              <Col md="6">
                <InputGroup
                  className={
                    "no-border input-lg" +
                    (especieFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-crow"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={
                      errores.Errorespecie
                        ? errores.Errorespecie.valido
                          ? ""
                          : "is-invalid form-control-danger form-control"
                        : ""
                    }
                    placeholder="Especie"
                    type="select"
                    onFocus={() => setespecieFocus(true)}
                    onBlur={() => setespecieFocus(false)}
                    id="especie"
                    name="especie"
                    onChange={onChange}
                    defaultValue={Fmascota.especie}
                    required
                  >
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Ave">Ave</option>
                    <option value="Animal de corral">Animal de corral</option>
                    <option value="Reptil">Reptil</option>
                    <option value="Roedor">Roedor</option>
                    <option value="Caballo">Caballo</option>
                  </Input>
                </InputGroup>
                {!errores.Errorespecie.valido ? (
                  <span className="text-muted">
                    {errores.Errorespecie.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </Col>
              <Col md="6">
                <InputGroup
                  className={
                    "no-border input-lg" +
                    (razaFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-feather"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={
                      errores.Errorraza
                        ? errores.Errorraza.valido
                          ? ""
                          : "is-invalid form-control-danger form-control"
                        : ""
                    }
                    placeholder="Raza"
                    type="select"
                    onFocus={() => setrazaFocus(true)}
                    onBlur={() => setrazaFocus(false)}
                    id="raza"
                    name="raza"
                    onChange={onChange}
                    defaultValue={Fmascota.raza}
                    required
                  >
                    {breed}
                  </Input>
                </InputGroup>
                {!errores.Errorraza.valido ? (
                  <span className="text-muted">
                    {errores.Errorraza.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <FormGroup check className="form-check-radio">
                  <Label check>
                    <Input
                      value="Hembra"
                      id="generoMascota"
                      name="generoMascota"
                      type="radio"
                      onChange={onChange}
                      checked={Fmascota.generoMascota === "Hembra"}
                      defaultValue={Fmascota.generoMascota}
                    ></Input>
                    <span className="form-check-sign"></span>
                    Hembra
                  </Label>
                </FormGroup>
                <FormGroup check className="form-check-radio">
                  <Label check>
                    <Input
                      defaultChecked
                      value="Macho"
                      id="generoMascota"
                      name="generoMascota"
                      type="radio"
                      onChange={onChange}
                      checked={Fmascota.generoMascota === "Macho"}
                      defaultValue={Fmascota.generoMascota}
                    ></Input>
                    <span className="form-check-sign"></span>
                    Macho
                  </Label>
                </FormGroup>
                {!errores.Errorgenero.valido ? (
                  <span className="text-muted">
                    {errores.Errorgenero.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </Col>
              <Col md="6">
                <InputGroup
                  className={
                    "no-border input-lg" +
                    (fechanacimiento ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-birthday-cake"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={
                      errores.Errorfechanacimiento
                        ? errores.Errorfechanacimiento.valido
                          ? ""
                          : "is-invalid form-control-danger form-control"
                        : ""
                    }
                    type="date"
                    onFocus={() => setfechanacimientoFocus(true)}
                    onBlur={() => setfechanacimientoFocus(false)}
                    id="fechanacimiento"
                    name="fechanacimiento"
                    onChange={onChange}
                    defaultValue={Fmascota.fechanacimiento}
                    required
                  ></Input>
                </InputGroup>
                {!errores.Errorfechanacimiento.valido ? (
                  <span className="text-muted">
                    {errores.Errorfechanacimiento.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <InputGroup
                  className={
                    "no-border input-lg" +
                    (colorPrincipalFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-palette"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={
                      errores.ErrorcolorPrincipal
                        ? errores.ErrorcolorPrincipal.valido
                          ? ""
                          : "is-invalid form-control-danger form-control"
                        : ""
                    }
                    placeholder="Color principal"
                    type="select"
                    onFocus={() => setrazaFocus(true)}
                    onBlur={() => setrazaFocus(false)}
                    id="colorPrincipal"
                    name="colorPrincipal"
                    onChange={onChange}
                    defaultValue={Fmascota.colorPrincipal}
                    required
                  >
                    <option selected="">Elija un color</option>
                    <option>Cafe</option>
                    <option>Blanco</option>
                    <option>Negro</option>
                    <option>Amarillo</option>
                    <option>Naranja</option>
                  </Input>
                </InputGroup>
                {!errores.ErrorcolorPrincipal.valido ? (
                  <span className="text-muted">
                    {errores.ErrorcolorPrincipal.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </div>
        </ModalBody>
        <div className="modal-footer">
          <Button
            color="sucess"
            type="button"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            <i className="fas fa-paper-plane"></i> Enviar
          </Button>
          <Button color="danger" type="button" onClick={() => setModal1(false)}>
            Cerrar
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Mascota;
