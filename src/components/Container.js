import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";

const style = {
  height: "100%",
  width: "100%",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left"
};

const ContainerTarget = {
  drop() {
    return { name: "Dustbin" };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };

  isContainer() {
    return true;
  }

  componentDidMount() {
    console.log("Container componentDidMount");
  }


  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = "#222";
    if (isActive) {
      backgroundColor = "darkgreen";
    } else if (canDrop) {
      backgroundColor = "darkkhaki";
    }

    return connectDropTarget(
      <div
        style={{ ...style, backgroundColor }}
      >
        {isActive ? "Release to drop" : "Drag a box here"}
        {this.props.children}
      </div>
    );
  }
}

export default DropTarget("ToolsItem", ContainerTarget, collect)(Container);
