import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';


const App = () => {
  var [funcShow, setFuncShow] = useState(true);
  var [ClassShow, setClassShow] = useState(true);
  return (
    <div className="container">
      <h1>Hello World</h1>
      <input type="button" value="remove func" onClick={function () {
        setFuncShow(false);
      }}/>
      <input type="button" value="remove comp" onClick={function () {
        setClassShow(false);
      }}/>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {ClassShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
};
var funcStyle = 'color:blue';
var funcId = 0;
function FuncComp(props) { //자기 자신이 render인
  //useState사용하면 배열이 리턴되고 그 배열은 두개의 값이다 
  var numberState = useState(props.initNumber);//state를 만들려면 useState() 에 어떠한 값을 전달하면된다 
  var number = numberState[0]; //그렇게 리턴된값이 첫번째자리가 그값이된다
  var setNumber = numberState[1];//값을 바꿀수있는 함수

  // var dateState = useState((new Date()).toString());
  // var _date = dateState[0]; 
  // var setDate = dateState[1];

  var [_date, setDate] = useState((new Date()).toString());

  useEffect(function () {
    console.log('%cfunc= > useEffect number(componentDidMount)'+(++funcId), funcStyle);
    document.title = number; 
    return function () {
      console.log('%cfunc= > useEffect return (componentWillUnMount)'+(++funcId), funcStyle);
    }//componentWillUnMount 소멸될때 실행됨 
  },[]);

  //side effect
  useEffect(function () {//useEffect : 첫번째 인자로 함수가 들어와야됨 변한 값에대한 처리를 할수있음
    console.log('%cfunc= > useEffect number(componentDidMount & componentDidUpdate 똑같다)'+(++funcId), funcStyle);
    document.title = number; //타이틀 바꿔줌
    return function () {
      console.log('%cfunc= > useEffect number return (componentDidMount & componentDidUpdate 퇴장)'+(++funcId), funcStyle);
    }
  },[number]);

  useEffect(function () {//useEffect : 첫번째 인자로 함수가 들어와야됨
    console.log('%cfunc= > useEffect date (componentDidMount & componentDidUpdate 똑같다)'+(++funcId), funcStyle);
    document.title = _date; //타이틀 바꿔줌
    return function () {
      console.log('%cfunc= > useEffect _date return (componentDidMount & componentDidUpdate 퇴장)'+(++funcId), funcStyle);
    }
  },[_date]);

  console.log('%cfunc= > render'+(++funcId), funcStyle);

  return(
    <div className="container">
      <h1>function style component</h1>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input type="button" value="random" onClick={
          function () {
              setNumber(Math.random());
            }
        }/>
      <input type="button" value="date" onClick={
          function () {
              setDate((new Date()).toString());
            }
        }/>
    </div>
  );
}
var classStyle = 'color:red';
class ClassComp extends React.Component {
  state = {
    number : this.props.initNumber,
    date:(new Date()).toString()
  }
  //lifecycle
  componentWillMount() {
    console.log('%cclass => componentWillMount',classStyle);
  }
  componentDidMount() {
    console.log('%cclass => componentDidMount',classStyle);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('%cclass => shouldComponentUpdate',classStyle);
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('%cclass => componentWillUpdate',classStyle);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('%cclass => componentDidUpdate',classStyle);
  }
  componentWillUnmount(){
    console.log('%cclass => componentWillUnmount',classStyle);
  }
  
  render(){
    console.log('%cclass => render', classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick={
          function () {
            this.setState({number:Math.random()})
          }.bind(this)
        }/>
        <input type="button" value="date" onClick={
          function () {
            this.setState({date:(new Date()).toString()})
          }.bind(this)
        }/>
      </div>
    )
  }
}
export default App;