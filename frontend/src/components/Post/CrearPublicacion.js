import React from "react";
import { Button, Input, CardHeader, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
function CrearPublicacion() {
  return (
    <>
      <Card className="card-post">
        <CardHeader>
          <div className="media d-block d-md-flex mt-4">
            <img
              className="avatar-small rounded z-depth-1 d-flex mx-auto mb-3"
              src="https://mdbootstrap.com/img/Photos/Avatars/img (27).jpg"
              alt="Generic placeholder image"
            />
            <div className="media-body text-center text-md-left ml-md-3 ml-0">
              <p className="font-weight-bold my-0">Nombre de usuario</p>

              <Input
                placeholder="¿Que quieres compartir hoy?"
                rows="3"
                type="textarea"
              ></Input>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <div className="pull-left">
            <Button className="btn-small" size="sm">
              <i class="fas fa-camera"></i>
            </Button>
          </div>
          <div className="pull-right">
            <Button className="btn-small" size="sm">
              <i class="far fa-paper-plane"></i>Publicar
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default CrearPublicacion;
