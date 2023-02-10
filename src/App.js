import React, {useReducer} from 'react';
import './index.css';
import Digitbutton from './Digitbutton';
import OPbutton from './OPbutton';

export const Actions = {
  ADD_DIGIT : 'add_digit',
  CHOOSE_OPERATION : 'choose_operation',
  CLEAR:"clear",
  DELETE_DIGIT : 'delete_digit',
  EVALUATE : 'evaluate',
}

const reducer = (state,{type,payload}) =>{
 switch(type){
  default :
  return ""
  case Actions.ADD_DIGIT:
    if(state.overwrite){
      return {
      ...state,
      currop : payload.digit,
      overwrite:false,
      }
    }
    if(payload.digit=== "0" && state.currop==="0"){ return state
    }
    if(payload.digit=== "." && state.currop.includes(".")) {
      return state
    }
    return{
      
      ...state,currop:`${state.currop || ""}${payload.digit}`
    }
    case Actions.CLEAR:
      return {}
    case Actions.CHOOSE_OPERATION:
    if(state.currop==null){
      return {...state,operation: payload.operation
      }
    }
    if(state.prevop== null && state.currop==null)
    {
      return state
    }
    if(state.prevop==null){
      return {...state,
             operation: payload.operation,
             prevop: state.currop,
             currop:null,
    }
  }
  return {
    ...state,
    prevop: evaluate(state),
    currop:null,
  }
  case Actions.EVALUATE:
    if(state.operation==null||state.currop==null||state.prevop==null){
      return state
    }
    return {
      ...state,overwrite:true,operation:null,prevop:null,currop:evaluate(state),
    }
    case Actions.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,overwrite:false,currop:null,
        }
      }
      if(state.currop==null){
        return state
      }
      if(state.currop.length ===1){
        return {...state,currop:null}
      }
      return {
        ...state,currop: state.currop.slice(0,-1)
      }
 }
}

const evaluate = ({currop,prevop,operation})=>{
  const prev = parseFloat(prevop);
  const curr = parseFloat(currop);
  if (isNaN(prev) || isNaN(curr)){ return ""}
  let result ="";
  switch(operation){
    case "+":
      result= prev + curr
    break
    case "x":
      result= prev * curr
    break
    case "-":
      result= prev - curr
    break
    case "÷":
       result= prev / curr
     break
    default:
      return ""
  }
  return result.toString()
}

const App = ()=>{
  const [{prevop,currop,operation}, dispatch] = useReducer(reducer,{})
  return (
    <>
    <h1>CALCULATOR</h1>
    <div className='grid-calc'>
      <div className='output'>
        <div className='prev-op'>{prevop}{operation}</div>
        <div className='curr-op'>{currop} </div>
      </div>
      <button className='span-two' onClick={()=>dispatch({type:Actions.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({type:Actions.DELETE_DIGIT})}>DEL</button>
      <OPbutton className="btn" operation="÷" dispatch={dispatch} />
      <Digitbutton digit= "1" dispatch={dispatch} />
      <Digitbutton digit= "2" dispatch={dispatch} />
      <Digitbutton digit= "3" dispatch={dispatch} />
      <OPbutton operation= "x" dispatch={dispatch} />
      <Digitbutton digit= "4" dispatch={dispatch} />
      <Digitbutton digit= "5" dispatch={dispatch} />
      <Digitbutton digit= "6" dispatch={dispatch} />
      <OPbutton operation="+" dispatch={dispatch} />
      <Digitbutton digit= "7" dispatch={dispatch} />
      <Digitbutton digit= "8" dispatch={dispatch} />
      <Digitbutton digit= "9" dispatch={dispatch} />
      <OPbutton operation="-" dispatch={dispatch} />
      <Digitbutton digit= "." dispatch={dispatch} />
      <Digitbutton digit= "0" dispatch={dispatch} />
      <button className='span-two' onClick={()=>dispatch({type:Actions.EVALUATE})}>=</button>
    </div>
    </>
  )
}


export default App;