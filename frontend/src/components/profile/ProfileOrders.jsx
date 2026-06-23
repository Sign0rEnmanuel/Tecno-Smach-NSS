import useOrder from "../../hooks/useOrder";

export default function ProfileOrders() {
    const { myOrdersQuery } = useOrder();

    if (myOrdersQuery.isLoading) {
        return <div className="loading-orders">Cargando tus pedidos...</div>;
    }

    if (myOrdersQuery.isError) {
        return <div className="error-orders">Error al cargar el historial</div>;
    }

    const orders = myOrdersQuery.data;

    return (
        <div className="profile-orders-section">
            <h2>Mi Historial de Compras</h2>
            
            {orders?.length === 0 ? (
                <p className="no-orders-msg">Aún no has realizado ninguna compra.</p>
            ) : (
                <div className="profile-orders-grid">
                    {orders?.map((order) => (
                        <div key={order._id} className="profile-order-card">
                            <div className="order-card-header">
                                <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                                <span className="order-total">${order.totalPrice}</span>
                            </div>
                            
                            {order.product ? (
                                <div className="order-card-product">
                                    <img src={order.product.image} alt={order.product.name} />
                                    <div className="order-card-info">
                                        <h4>{order.product.name}</h4>
                                        <p>Cantidad: {order.quantity}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="order-card-product deleted">
                                    <p>Producto ya no disponible</p>
                                </div>
                            )}

                            <div className="order-card-address" style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary-color)' }}>
                                {order.address ? (
                                    <>
                                        <strong>Entrega en:</strong>
                                        <p>{order.address.street}, {order.address.number} {order.address.complement && `(${order.address.complement})`}</p>
                                        <p>{order.address.neighborhood}, {order.address.city} - {order.address.state}</p>
                                        <p>CEP: {order.address.zipCode}</p>
                                    </>
                                ) : (
                                    <p>Dirección no registrada</p>
                                )}
                            </div>

                            <div className="order-card-footer" style={{ marginTop: '1rem' }}>
                                <div className="order-status-group">
                                    <span className="status-label">Pago:</span>
                                    <span className={`status-badge ${order.paymentStatus}`}>
                                        {order.paymentStatus === "pending" ? "Pendiente" : 
                                         order.paymentStatus === "approved" ? "Aprobado" : "Rechazado"}
                                    </span>
                                </div>
                                <div className="order-status-group">
                                    <span className="status-label">Entrega:</span>
                                    <span className={`delivery-badge ${order.deliveryStatus}`}>
                                        {order.deliveryStatus === "preparing" ? "Preparando" : 
                                         order.deliveryStatus === "shipped" ? "Enviado" : "Entregado"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
