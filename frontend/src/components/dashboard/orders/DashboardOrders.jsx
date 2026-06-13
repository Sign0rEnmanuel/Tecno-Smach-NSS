import useOrder from "../../../hooks/useOrder";
import "../../../styles/components/dashboard/orders/DashboardOrders.css";

export default function DashboardOrders() {
    const { allOrdersQuery, updateDeliveryMutation } = useOrder();

    const handleDeliveryChange = (orderId, newStatus) => {
        updateDeliveryMutation.mutate({ orderId, deliveryStatus: newStatus });
    };

    if (allOrdersQuery.isLoading) {
        return <div className="loading-orders">Cargando pedidos...</div>;
    }

    if (allOrdersQuery.isError) {
        return <div className="error-orders">Error al cargar pedidos</div>;
    }

    return (
        <div className="dashboard-orders-container">
            <div className="dashboard-orders-header">
                <h2>Gestión de Pedidos</h2>
            </div>
            
            <div className="orders-table-wrapper">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Producto</th>
                            <th>Total</th>
                            <th>Pago</th>
                            <th>Entrega</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrdersQuery.data?.map((order) => (
                            <tr key={order._id}>
                                <td>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td>
                                    <div className="order-user">
                                        <span className="order-user-name">{order.user?.username || "Usuario eliminado"}</span>
                                        <span className="order-user-email">{order.user?.email || ""}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="order-product">
                                        {order.product ? (
                                            <>
                                                <img src={order.product.image} alt={order.product.name} />
                                                <div className="order-product-info">
                                                    <span className="order-product-name">{order.product.name}</span>
                                                    <span className="order-product-quantity">Cant: {order.quantity}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <span className="order-product-name">Producto eliminado</span>
                                        )}
                                    </div>
                                </td>
                                <td className="order-price">
                                    ${order.totalPrice}
                                </td>
                                <td>
                                    <span className={`status-badge ${order.paymentStatus}`}>
                                        {order.paymentStatus === "pending" ? "Pendiente" : 
                                         order.paymentStatus === "approved" ? "Aprobado" : "Rechazado"}
                                    </span>
                                </td>
                                <td>
                                    <select 
                                        className="delivery-select"
                                        value={order.deliveryStatus}
                                        onChange={(e) => handleDeliveryChange(order._id, e.target.value)}
                                        disabled={updateDeliveryMutation.isPending || order.paymentStatus !== "approved"}
                                        title={order.paymentStatus !== "approved" ? "El pago debe estar aprobado para modificar la entrega" : ""}
                                    >
                                        <option value="preparing">Preparando</option>
                                        <option value="shipped">Enviado</option>
                                        <option value="delivered">Entregado</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {allOrdersQuery.data?.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>No hay pedidos registrados</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
