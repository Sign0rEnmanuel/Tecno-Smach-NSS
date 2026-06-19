import useAdmin from "../../../hooks/useAdmin";
import "../../../styles/components/dashboard/users/DashboardUsers.css";

export default function DashboardUsers() {
    const { usersQuery, changeRoleMutation } = useAdmin();

    const handleRoleChange = (userId, newRole) => {
        changeRoleMutation.mutate({ userId, role: newRole });
    };

    if (usersQuery.isLoading)
        return <div className="loading-users">Cargando usuarios...</div>;
    if (usersQuery.isError)
        return <div className="error-users">Error al cargar usuarios</div>;

    return (
        <div className="dashboard-users-container">
            <div className="dashboard-users-header">
                <h2>Gestión de Usuarios</h2>
            </div>

            <div className="users-table-wrapper">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol Actual</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersQuery.data?.map((user) => (
                            <tr key={user._id}>
                                <td data-label="Nombre" className="user-name">
                                    {user.username}
                                </td>
                                <td data-label="Email" className="user-email">
                                    {user.email}
                                </td>
                                <td data-label="Rol">
                                    <span className={`role-badge ${user.role}`}>
                                        {user.role === "admin"
                                            ? "Admin"
                                            : "User"}
                                    </span>
                                </td>
                                <td data-label="Cambiar rol">
                                    <select
                                        className="role-select"
                                        value={user.role}
                                        onChange={(e) =>
                                            handleRoleChange(
                                                user._id,
                                                e.target.value,
                                            )
                                        }
                                        disabled={changeRoleMutation.isPending}
                                    >
                                        <option value="user">
                                            Usuario normal
                                        </option>
                                        <option value="admin">
                                            Administrador
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
