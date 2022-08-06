import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ redirectPath = '/login', token }) => {
    if(!token){
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};