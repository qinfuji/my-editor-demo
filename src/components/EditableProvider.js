import React, { Component } from "react";

const style = {
  position: "absolute",
  //top: 0,
  //left: 0
  float: "left"
};

//遮罩层需要获取被遮罩对象的node引用
class MarkePane extends Component {
  render() {
    return <div style={{ ...style }}>我在测试遮罩层</div>;
  }
}

function editable(WrapCommponent, idx = 0) {
  console.log(WrapCommponent)
  if (
    !WrapCommponent ||
    Object.prototype.toString.call(WrapCommponent) === "[object String]"
  ) {
    return WrapCommponent;
  }

  //console.log(WrapCommponent.type);
  let children = WrapCommponent.props.children;
  //如果children是字符串则是个文本节点
  if (!(Object.prototype.toString.call(children) === "[object String]")) {
    children = React.Children.map(children, (child, idx) => {
      return editable(child, idx);
    });
    if (children) {
      children.push(<MarkePane key={children.length} />);
    } else {
      children = <MarkePane key={0} />;
    }
  } else {
    if (children) {
      children = [children, <MarkePane key={1} />];
    } else {
      children = <MarkePane key={0} />;
    }
  }

  let saveRef = function(ref) {
      console.log( ref, !!ref.render , ref.isContainer);
  };

  let props = { aaa: 1, ref: saveRef }; //TODO Stateless Functional Component 不能有ref

  let cloneEle = React.cloneElement(WrapCommponent, props, children);

  class Editable extends Component {
    getRenderComponent() {}

    render() {
      //console.log("Editable render");
      return this.props.children;
    }

    /**
     * 在加载完毕后在引用的组件上加上一个遮罩层
     */
    componentDidMount() {
      //console.log("Editable compomentDidMount");
    }
  }

  return <Editable key={idx}>{cloneEle}</Editable>;
}

/**
 * 拦截当前页面下的所有组件，通过工厂找到对应的可编辑对象
 * 1、当页面装载时进行拦截
 * 2、获取当前拦截组件的可编辑对象。
 * 3、当编辑
 */
class EditableProvider extends Component {
  renderChildren() {
    let { children } = this.props;
    let _retchildren;
    if (Array.isArray(children)) {
      _retchildren = [];
      children.forEach((item, idx) => {
        _retchildren[idx] = editable(item, idx);
      });
      return _retchildren;
    } else {
      _retchildren = editable(children);
      return _retchildren;
    }
  }

  render() {
    return this.renderChildren();
  }
}

export default EditableProvider;
