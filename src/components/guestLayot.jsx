import React, {useState} from "react";
import { Navigate,Outlet } from "react-router-dom"

function GuestLayout() {
    const [token] = useState(localStorage.getItem('ACCESS_TOKEN'));
    if(token){
        return <Navigate to='/cars' />
    }
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default GuestLayout