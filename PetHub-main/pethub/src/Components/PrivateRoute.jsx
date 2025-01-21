import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const PrivateRoute=({children})=>{

    let isAuth=useSelector((ele)=>ele.petData.isAuth)
        console.log(isAuth);
       
       if(!isAuth){
        return <Navigate to="/login"/>
       }

    return (
        children
    )
}

export default PrivateRoute