import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from './components/pages/login/index';
import Register from './components/pages/register/index';
import Dasboard from './components/pages/dashboard/Dashboard';
import GuestLayout from "./components/guestLayot";
import DefaultLayout from "./components/defalutLayout";
import Cars from "./components/pages/cars/Cars";
import Brands from "./components/pages/brands/Brands";
import Categories from "./components/pages/categories/Categories";
import CategoriesForm from "./components/pages/categories/CategoriesForm";
import BrandsForm from "./components/pages/brands/BrandsForm";
import CarForm from "./components/pages/cars/CarForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/login" />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register/>
            },
        ],
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/cars" />
            },
            {
                path: '/cars',
                element: <Cars />,
            },
            {
                path: '/cars/add',
                element: <CarForm />,
            },
            {
                path: '/categories',
                element: <Categories />,
            },
            {
                path: '/categories/add',
                element: <CategoriesForm />,
            },
            {
                path: '/brands',
                element: <Brands />,
            },
            {
                path: '/brands/add',
                element: <BrandsForm />,
            },
        ],
    },
])

export default router