import { Actions } from "./App"

export default  function Digitbutton ({dispatch,digit})
{
    return(
        <button onClick={()=>dispatch({type:Actions.ADD_DIGIT,payload : {digit}})}>{digit}</button>
    )


}