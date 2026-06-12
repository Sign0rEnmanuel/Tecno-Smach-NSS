import useAuth from "../hooks/useAuth.js";
import "../styles/pages/Profile.css";

export default function Profile() {
    const { profileQuery, logout } = useAuth();
    if (profileQuery.isLoading) {
        return <div className="profile-state">Cargando perfil...</div>;
    }
    if (profileQuery.isError) {
        return <div className="profile-state">Error al cargar el perfil...</div>;
    }
    const profile = profileQuery.data;

    return (
        <div className="profile">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>Perfil de {profile.username}</h1>
                </div>

                <div className="profile-content">
                    <div className="profile-info">
                        <p>
                            <strong>Nombre de usuario:</strong>{" "}
                            {profile.username}
                        </p>
                        <p>
                            <strong>Email:</strong> {profile.email}
                        </p>
                        <p>
                            <strong>Rol:</strong> {profile.role}
                        </p>
                        <p>
                            <strong>ID:</strong> {profile._id}
                        </p>
                    </div>

                    <div className="profile-actions">
                        <button onClick={logout}>Cerrar sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
