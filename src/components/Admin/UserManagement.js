// src/components/Admin/UserManagement.js

import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/userService'; // Directly import the function

const UserManagement = ({ adminUserId }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers(adminUserId); // Pass admin user ID
                setUsers(fetchedUsers);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUsers();
    }, [adminUserId]); // Dependency on adminUserId

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>User Management</h1>
            <ul>
                {users.map(user => (
                    <li key={user.user_id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
