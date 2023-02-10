import { Actions } from "./App";
import './index.css';

export default  function Digitbutton ({dispatch,digit})
{
    return(
        <button  onClick={()=>dispatch({type:Actions.ADD_DIGIT,payload : {digit}})}>{digit}</button>
    )


}