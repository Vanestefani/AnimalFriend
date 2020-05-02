import React from "react";
import {
  Label,
  Input,
  CardHeader,
  Card,Container,
  CardBody,
  FormGroup,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
function ListRecordatorios() {
  return (
    <>
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <CardTitle ><h3 ><b>Recordatorios</b></h3></CardTitle>
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

      </Card>
    </>
  );
}

export default ListRecordatorios;
