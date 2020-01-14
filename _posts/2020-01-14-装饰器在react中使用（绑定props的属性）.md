---
layout: post
color: blue-grey
cover: "../img/bg.jpg"
title:  "装饰器在react中的使用（绑定props的属性）"
date:   2020-01-14 08:55:39
tags: javaScript react ES6
categories: LiAncheng update
---

### 装饰器
**装饰器在react中的使用**

> 注意在react的环境中运行，且需要支持装饰器

```javaScript

import ReactDOM from 'react-dom';
import React, { Component } from 'react'
// 模拟redux把mapState,mapDispatch绑在props上
const mapState = () =>{
  return {
    count:0
  }
}
const mapDispatch = () => {
  return {
    getCount(count) {
      console.log(count)
    }
  }
}

function desc(Target) { //高阶组件的思想
  return class Foo extends Component {
    render(){
      return (
        <Target
          count = {mapState()['count']}
          getCount = {mapDispatch()['getCount']}
        ></Target>
      )
    }
  }
}

@desc
class Test extends Component {
  getTest = () => { 
    this.props.getCount(1)
  }
  render() {
    return (
      <div>
          <button onClick = {this.getTest}>点我</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Test></Test>
  , 
  document.getElementById('root')
);

```

#### 组件组合
```javaScript

import ReactDOM from 'react-dom';
import React, { Component } from 'react'
class Child extends Component { //Target
  render() {
    return (
      <div>
        我是child =》 Test.Item
      </div>
    )
  }
}

function desc(Target) { //高阶组件的思想
  Target.Item = Child
}

@desc
class Test extends Component {
  render() {
    return (
     <>
      {/* 这是关键 */}
      {this.props.children}  
     </>
    )
  }
}

ReactDOM.render(
  <Test>
    <Test.Item></Test.Item>
    <Test.Item></Test.Item>
    <Test.Item></Test.Item>
    <Test.Item></Test.Item>
    <Test.Item></Test.Item>
    <Test.Item></Test.Item>
  </Test>
  , 
  document.getElementById('root')
);

```