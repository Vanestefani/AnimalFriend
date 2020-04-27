import React, { Component } from "react";
import { Button, Input, CardHeader, Card, CardBody, Form } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import compose from "recompose/compose";
export class CrearPublicacion extends Component {
  state = {
    postText: "",
  };
  handleChange = (e) => {
    const postText = e.target.value;
    this.setState(() => ({ postText }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { postText } = this.state;
    const { dispatch, user } = this.props;

  };

  render() {
    const { postText } = this.state;

    return (
      <>
        <Card className="card-post">
        <Form
                  noValidate
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
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
                    id="postText"
                    name="postText"
                    onChange={this.handleChange}
                    defaultValue={postText}
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
              <Button className="btn-small" size="sm"
              type="sudmit"
              >
                <i class="far fa-paper-plane"></i>Publicar
              </Button>
            </div>
          </CardBody>
          </Form>
        </Card>
      </>
    );
  }
}

export default CrearPublicacion;
