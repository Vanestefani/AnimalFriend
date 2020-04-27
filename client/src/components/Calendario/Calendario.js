import * as React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
export default class Calendario extends React.PureComponent {
  state = {
    date: new Date(),
  };

  onChange = (date) => this.setState({ date });
  render() {
    return (
      <div>
        <h1 classname="text-center">Calendario</h1>
        <Calendar onChange={this.onChange} value={this.state.date} />
      </div>
    );
  }
}
