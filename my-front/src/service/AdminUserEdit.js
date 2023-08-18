import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AdminEditUser() {
    const { id } = useParams();  // Get the id from the URL
    console.log("User ID:", id);

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user details with the given id
        console.log("useEffect is running");

        fetch(`/api/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error("Failed to fetch user:", error));
    }, [id]);

    // useEffect(() => {

    //     setUser({
    //         name: "John Doe",
    //         email: "johndoe@example.com"
    //     });
    // }, []);


    const handleSave = () => {
        // Make an API call to save the updated user info
        // After successful save, navigate back to the admin panel or wherever you prefer
        fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                if (response.ok) {
                    alert("User details updated successfully");
                    navigate("/admin");
                } else {
                    alert("Failed to update user details");
                }
            })
            .catch(error => console.error("Failed to update user:", error));
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mt-5">
        <h1>Edit User</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                    className="form-control"
                    value={user.name}
                    onChange={e => setUser({ ...user, name: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                    className="form-control"
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Status:</label>
                <select
                    className="form-select"
                    value={user.status}
                    onChange={e => setUser({ ...user, status: e.target.value })}
                >
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>
            {/* Add other fields as needed */}
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    </div>
    
    );
}

export default AdminEditUser;
