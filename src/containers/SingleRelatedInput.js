import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export default class SingleResourceInput extends Component {
  
  HandlePushNewRelated = e => {
    const input = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: input
    });
  };

  HandleSubmitNewRelated = e => {
    const state = this.state;
    const obj = {};
    for (var key in state) {
      if (state[key] !== undefined) {
        obj[key] = state[key];
      }
    }
    obj["id"] = this.props.id;
    this.sendFetch(obj);
  };

  sendFetch(obj) {
    return fetch(
      `https://cyf-glossary-api.glitch.me/api/push/${this.props.id}`,
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        if (response._id) {
          this.props.handleUpdate(response);
        }
      });
  }

  render() {
    return (
      <Fragment>
        <li>
          <input
            placeholder={this.props.placeholder}
            type="text"
            name={this.props.name}
            noValidate
            onChange={this.HandlePushNewRelated}
          />
          <span className="add-margin-left icon">
            <FontAwesomeIcon
              icon={faPlusSquare}
              onClick={this.HandleSubmitNewRelated}
            />{" "}
          </span>
        </li>
      </Fragment>
    );
  }
}
