import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { profileQuery } = useAuth();

    if (profileQuery.isLoading) {
        return <div>Cargando...</div>;
    }

    if (profileQuery.isError || !profileQuery.data) {
        return <Navigate to="/" replace />;
    }

    if (profileQuery.data.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
