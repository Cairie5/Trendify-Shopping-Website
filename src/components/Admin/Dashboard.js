import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { getOrdersByUserId } from '../../services/orderService'; // Corrected import

function Dashboard() {
    const [orderStats, setOrderStats] = useState([]);
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const stats = await getOrdersByUserId(1); // replace with actual data fetch for statistics
            const sales = stats.map((order, index) => ({ month: `Month ${index + 1}`, sales: order.total }));
            setOrderStats(stats);
            setSalesData(sales);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <div className="charts-container">
                <div className="chart">
                    <h3>Order Statistics</h3>
                    <LineChart width={600} height={300} data={orderStats}>
                        <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </div>
                <div className="chart">
                    <h3>Sales Data</h3>
                    <BarChart width={600} height={300} data={salesData}>
                        <Bar dataKey="sales" fill="#82ca9d" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                    </BarChart>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
