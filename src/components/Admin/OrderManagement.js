import React, { useEffect, useState } from 'react';
import { getOrdersByUserId } from '../../services/orderService'; // Corrected import

function OrderManagement() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const fetchedOrders = await getOrdersByUserId(1); // Modify with actual logic if needed
            setOrders(fetchedOrders);
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Order Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.userId}</td>
                            <td>{order.status}</td>
                            <td>{order.total}</td>
                            <td>{order.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderManagement;
