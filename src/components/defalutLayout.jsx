import React, {useState} from "react";
import { Navigate } from "react-router-dom"
import Dasboard from "./pages/dashboard/Dashboard";

function DefaultLayout() {
    const [token] = useState(localStorage.getItem('ACCESS_TOKEN'))

    if(!token){
        return <Navigate to='/' />
    }

    return (
        <div>
            <div>
                <Dasboard/>
            </div>
        </div>
    )
}

export default DefaultLayout