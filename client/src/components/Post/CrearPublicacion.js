import React, { useState, useContext } from "react";
import {
  InputGroup,
  Button,
  Input,
  CardHeader,
  Card,
  CardBody,
  Form,
} from "reactstrap";
import PostContext from "../../context/post/postContext";
import AuthContext from "../../context/autenticacion/authContext";
function CrearPublicacion() {
  const imageInputRef = React.useRef();
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
  //focus inputs
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);

  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const { addPost } = postContext;
  const [state, setstate] = useState({
    descripcion: "",
    errors: {
      Errordescripcion: { valido: true, mensaje: "" },
      Errorfoto: { valido: true, mensaje: "" },
    },
  });
  const [photo, guardararchivophoto] = useState(null);
  const { descripcion, errors } = state;
  const validate = () => {
    let isError = false;

    if (descripcion.trim() === "") {
      errors.Errordescripcion.valido = false;
      errors.Errordescripcion.mensaje =
        "(El campo descripción no puede estar vacio)";
    } else {
      errors.Errordescripcion.valido = true;
    }
    if (photo === null || photo === "") {
      errors.Errorfoto.valido = false;
      errors.Errorfoto.mensaje = "(Debe subir una imagen)";
      console.log("error imagen");
    } else {
      errors.Errorfoto.valido = true;
    }

    if (!errors.Errordescripcion.valido || !errors.Errorfoto.valido) {
      isError = true;
    } else {
      isError = false;
    }
    console.log(isError);
    return isError;
  };

  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (!err) {
      console.log(!err);
      let userid = usuario._id;

      let formData = new FormData();
      formData.append("imagen", photo, photo.name);
      formData.append("descripcion", descripcion);
      formData.append("autor", userid);
      addPost(formData);
      setstate({
        descripcion: " ",
        errors: {
          Errordescripcion: { valido: true, mensaje: "" },
          Errorfoto: { valido: true, mensaje: "" },
        },
      });
      guardararchivophoto(null);
      imageInputRef.current.value = "";
    }
    //Resets the file name of the file input - See #2
  };

  return (
    <>
      <Card className="card-post">
        <Form noValidate autoComplete="off">
          <CardHeader>
            <div className="media d-block d-md-flex mt-4">
              <img
                className="avatar-small rounded z-depth-1 d-flex mx-auto mb-3"
                src={usuario.fotoPerfil}
                width="60px"
                alt="avatar"
              ></img>
              <div className="media-body text-center text-md-left ml-md-3 ml-0">
                <p className="font-weight-bold my-0">{usuario.nombre}</p>
                <InputGroup
                  className={
                    "no-border input-lg" +
                    (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <Input
                    className={
                      errors.Errordescripcion.valido
                        ? ""
                        : "is-invalid form-control-danger form-control"
                    }
                    placeholder="¿Que quieres compartir hoy?"
                    rows="3"
                    maxlength="150"
                    type="textarea"
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                    onChange={handleChange}
                  ></Input>
                </InputGroup>
                <i className="text-info">Máximo 150 caracteres</i>
                {errors.Errordescripcion.valido ? (
                  ""
                ) : (
                  <span className="text-muted">
                    {errors.Errordescripcion.mensaje}
                  </span>
                )}
              </div>
            </div>
          </CardHeader>

          <CardBody>
            <div className="pull-left">
              <div className="upload-btn-wrapper">
                <button className="btn btn-info">
                  {" "}
                  <i className="fas fa-camera"></i>Subir imagen
                </button>
                <InputGroup
                  className={
                    "no-border input-lg" +
                    (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <Input
                    accept={acceptedFileTypes}
                    onChange={(e) => guardararchivophoto(e.target.files[0])}
                    id="photo"
                    name="photo"
                    type="file"
                    className="btn-small"
                    size="sm"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                    ref={imageInputRef}
                  ></Input>{" "}
                </InputGroup>
                {errors.Errorfoto.valido ? (
                  ""
                ) : (
                  <span className="text-muted">{errors.Errorfoto.mensaje}</span>
                )}
              </div>
            </div>
            <div className="pull-right">
              <Button
                className="btn-small"
                size="sm"
                type="sudmit"
                onClick={handleSubmit}
              >
                <i className="far fa-paper-plane"></i>Publicar
              </Button>
            </div>
          </CardBody>
        </Form>
      </Card>
    </>
  );
}

export default CrearPublicacion;
