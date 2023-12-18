import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, RouterProvider} from 'react-router-dom'
import router from './route.jsx'
import {Provider} from "react-redux";
import {store} from "./redux/store.js";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
        <div>
            <Provider store={store}>
                <RouterProvider router={router}/>
                <ToastContainer />
            </Provider>
        </div>
)
