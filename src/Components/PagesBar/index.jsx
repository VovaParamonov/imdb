import React, { Component } from "react";

import "./style.css";

export default class PagesBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberPages: this.props.numberPages
    };
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextProps.numberPages !== this.state.numberPages) {
      this.setState({
        numberPages: nextProps.numberPages
      });
    }
  }

  render() {
    const numbers = [];
    for (let i = 1; i <= this.state.numberPages; i++) {
      const style =
        i === this.props.selectedPage ? { backgroundColor: "#a8a8a8ff" } : {};

      numbers.push(
        <button
          style={style}
          key={i}
          className="number"
          onClick={() => this.props.handle(i)}
        >
          {i}
        </button>
      );
    }

    return <div className="PageBar">{numbers}</div>;
  }
}
