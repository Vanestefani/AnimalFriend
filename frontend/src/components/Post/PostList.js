import React from "react";
import { Link } from "react-router-dom";
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
  Button,
  Input,
} from "reactstrap";
function PostList() {
  return (
    <>
      <Card className="card-post">
        <CardHeader>
          <CardTitle>
            <div className="pull-right">
              <UncontrolledDropdown>
                <DropdownToggle
                  aria-haspopup={true}
                  caret
                  color="neutral"
                  size="sm"
                ></DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i class="fas fa-edit"></i>
                    Editar
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i class="fas fa-trash-alt"></i>
                    Eliminar
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </CardTitle>
          <div className="media d-block d-md-flex mt-4">
            <img
              className="avatar-small rounded z-depth-1 d-flex mx-auto mb-3"
              src="https://mdbootstrap.com/img/Photos/Avatars/img (27).jpg"
              alt="Generic placeholder image"
            />
            <div className="media-body text-center text-md-left ml-md-3 ml-0">
              <div className="pull-left">
                <p className="font-weight-bold my-0">Nombre de usuario</p>

                <p>10/04/2019</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <Container>
            <p>
              Lorem isiasdsdasjdkasdjkasjkdasjkdjkasjkdjasjdajskdjkasjkdjkasjkd
              sadasdjkasdjasjdasjkdjk
            </p>
            <img
              alt="..."
              src={require("../../assets/img/pet-fondo.jfif")}
            ></img>
          </Container>
        </CardBody>
        <CardFooter>
          <div className="pull-left">
            <Button size="sm" color="neutral">
              <i class="fas fa-bone"></i>
            </Button>
            <Button size="sm" color="neutral">
              <i class="fas fa-comment-alt"></i>
            </Button>
            <Button size="sm" color="neutral">
              <i class="fas fa-share-square"></i>
            </Button>
          </div>
        </CardFooter>
        <Container>
          <div className="pull-right">
            <Link>Ver comentarios</Link>
          </div>
          <br></br>
          <h3>Comentarios</h3>
          <div>
            <Input
              placeholder="¿Que quieres compartir hoy?"
              rows="3"
              cols="2"
              type="textarea"
            ></Input>
          </div>
        </Container>
      </Card>
    </>
  );
}

export default PostList;
