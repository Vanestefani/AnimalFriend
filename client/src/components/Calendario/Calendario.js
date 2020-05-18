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
        <h3 className="text-center">Calendario</h3>
        <Calendar onChange={this.onChange} value={this.state.date} />
      </div>
    );
  }
}
