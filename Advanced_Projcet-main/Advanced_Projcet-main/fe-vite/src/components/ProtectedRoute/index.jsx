import useSelection from "antd/es/table/hooks/useSelection";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) =>{
    const isAuthenticated = useSelection(state => state.account.isAuthenticated)
    return(
        <>
            {isAuthenticated === true ?
            <>{props.children}</>
            :
            <Navigate to='/login' replace/>}
        </>
    )
}

export default ProtectedRoute; 

// Đá người dùng trở lại