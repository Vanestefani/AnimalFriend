import React from "react";

// reactstrap components
import { Container, Card, Table } from "reactstrap";
import Loading from "../../components/Loading";

function InfoPet(props) {
  return (
    <>

      {props.dato ? (
        <Card className="card-general">
          <Container>
            <Table>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <i className="fas fa-birthday-cake"></i>
                    <b>Fecha de Nacimiento :</b>
                  </td>
                  <td>{props.dato.fecha_nacimiento}</td>
                </tr>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <i className="fas fa-palette"></i>Color principal :
                  </td>
                  <td>{props.dato.color}</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>
                    <i className="fas fa-heart"></i>Situación sentimental :
                  </td>
                  <td>{props.dato.civil}</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>
                    <i className="fas fa-microchip"></i>N° Chip :
                  </td>
                  <td>{props.dato.chip}</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>
                    <i className="fas fa-user-md"></i> Estelerizado:
                  </td>
                  <td>{props.dato.estelerizado}</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>
                    <i className="fas fa-exclamation-triangle"></i>
                    <b> Peligroso:</b>
                  </td>
                  <td>{props.dato.peligroso}</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>
                    <i className="fas fa-ruler"></i>
                    <b> Tamaño:</b>
                  </td>
                  <td>{props.dato.estatura}</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>
                    <i className="fas fa-notes-medical"></i>
                    <b> Alergias:</b>
                  </td>
                  <td>{props.dato.alergias}</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>
                    <i className="fas fa-dragon"></i>
                    <b> Personalidad:</b>
                  </td>
                  <td>{props.dato.personalidad}</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </Card>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}

export default InfoPet;
