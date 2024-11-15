import React from 'react';
import RevenueChart from './revenuechart';
// import './Dashboard.css';

function Dashboard() {
  return (
    <section className="dashboard">
      <h1>Welcome back.</h1>
      <div className="widgets">
        <div className="widget">Sales</div>
        <div className="widget">Orders</div>
        <div className="widget">Reviews</div>
      </div>
      <div className="chart">
        <h2>Revenue</h2>
        <RevenueChart />
      </div>
    </section>
  );
}

export default Dashboard;
