import React, { Component } from "react";
import "./App.css";

import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Container from "./components/Container";
import Label from "./components/Label";
import Button from "./components/Button";
import Div from "./components/Div";
// import HocComponent from "./components/HocComponent"
import { Layout, Flex, Fixed } from "react-layout-pane";
import SplitPane from "react-split-pane";
import Pane from "react-split-pane/lib/Pane";

export default class App extends Component {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Layout type="column">
          <Fixed className="header">Fixed Header</Fixed>
          <Flex>
            <Layout type="row">
              <Fixed className="sidebar">
                <Layout type="column">
                  <Fixed>Top Left</Fixed>
                  <Flex style={{ margin: "9px" }}>
                    {/* <EditableProvider> */}
                    <br />
                    <Label text="Label1" name="Label1" />
                    <br />
                    <Label text="Label2" name="Label2" />
                    <br />
                    <Button label="测试" />
                    {/* </EditableProvider> */}
                  </Flex>
                  <Fixed>Bottom Left</Fixed>
                </Layout>
              </Fixed>
              <Flex className="content">
                <SplitPane split="horizontal">
                  <Container />
                  <div />
                  <Container />
                  <div />
                  <Container />
                  <Div />
                </SplitPane>
              </Flex>
              <Fixed className="sidebar">
                <Layout type="column">
                  <Fixed>Top Right</Fixed>
                  <Flex />
                  <Fixed>Bottom Right</Fixed>
                </Layout>
              </Fixed>
            </Layout>
          </Flex>
          <Fixed className="header">Fixed Footer</Fixed>
        </Layout>
      </DragDropContextProvider>
    );
  }
}

//export default DragDropContext(HTML5Backend)(App);
