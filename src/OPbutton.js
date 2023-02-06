import { Actions } from "./App"

export default  function OPbutton ({dispatch,operation})
{
    return(
        <button onClick={()=>dispatch({type:Actions.CHOOSE_OPERATION,payload : {operation}})}>
            {operation}</button>
    )


}