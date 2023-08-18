
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import userData from './users.json';



export function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {
        // Fetch data from your backend when the component mounts
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);  // This effect runs once when the component mounts

    // function handleEdit(user) {
    const handleEdit = (userId) => {
        navigate(`/admin/user/${userId}/edit`);
        console.log("Editing user:", userId);
    }


    function handleDelete(userId) {
        fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.msg === "User Deleted.") {
                    const updatedUsers = users.filter(user => user.id !== userId);
                    setUsers(updatedUsers);
                }
            });
    }

    const toggleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(prevUsers => prevUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers(prevUsers => [...prevUsers, userId]);
        }
    };

    const toggleAllUsersSelection = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user.id));
        }
    };

    return (
        <div className="container mt-5">
    <h1 className="mb-4">Admin Panel</h1>
    <table className="table table-bordered">
        <thead>
            <tr>
                <th scope="col">
                    <input
                        type="checkbox"
                        checked={selectedUsers.length === users.length}
                        onChange={toggleAllUsersSelection}
                    />
                </th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Last Login</th>
                <th scope="col">Registration Time</th>
                <th scope="col">Status</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            {users.map(user => (
                <tr key={user.id}>
                    <td>
                        <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => toggleUserSelection(user.id)}
                        />
                    </td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.last_login_time}</td>
                    <td>{user.registration_time}</td>
                    <td>{user.status}</td>
                    <td>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleEdit(user.id)}
                        >
                            Edit
                        </button>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
    );
}
