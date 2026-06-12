import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
    const { profileQuery } = useAuth();

    if (profileQuery.isLoading) {
        return <div>Cargando...</div>;
    }

    if (profileQuery.isError || !profileQuery.data) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
