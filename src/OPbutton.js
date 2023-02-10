import { Actions } from "./App";
import './index.css';

export default  function OPbutton ({dispatch,operation})
{
    return(
        <button  onClick={()=>dispatch({type:Actions.CHOOSE_OPERATION,payload : {operation}})}>
            {operation}</button>
    )


}