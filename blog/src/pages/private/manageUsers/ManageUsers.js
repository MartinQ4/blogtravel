import React from 'react';

import Navbar from '../../../components/navbar/Navbar';
import useUsers from '../../../hooks/useUsers'; 
import AsideA from '../../../components/aside/AsideAdmin';
import './ManageUsers.css'

export default function ManageUsers() {
    const {
        users,
        newUser,
        editingUser,
        handleChange,
        handleEditChange,
        handleAddUser,
        handleEdit,
        handleUpdateUser,
        handleDeleteUser,
    } = useUsers(); 

    return (
        <div className='editor-layout'>
            <AsideA/>

            <main>
            <div className='head'>
                <h3>Uživatelé</h3>
            </div>
            
                

            <div className='user-list'>
                {users.map(user => (
                    <div key={user.id} className="user">
                        <p><strong>Uživatelské jméno:</strong> {user.username}</p>
                        <p><strong>Jméno:</strong> {user.firstname} {user.lastname}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <div className='buttons'>
                            <button onClick={() => handleEdit(user)} className='btn'>Edit</button>
                            <button onClick={() => handleDeleteUser(user.id)} className='btn'>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {editingUser && (
                <div>
                    <h3>Edit User</h3>
                    <form onSubmit={handleUpdateUser}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={editingUser.username}
                            onChange={handleEditChange}
                            required
                        />
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={editingUser.firstname}
                            onChange={handleEditChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={editingUser.lastname}
                            onChange={handleEditChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={editingUser.password}
                            onChange={handleEditChange}
                            required
                        />
                        <input
                            type="text"
                            name="role"
                            placeholder="Role"
                            value={editingUser.role}
                            onChange={handleEditChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={editingUser.email}
                            onChange={handleEditChange}
                            required
                        />
                        <button type="submit">Update User</button>
                    </form>
                </div>
            )}


            <div className='form-section-add-user'>
                <h3>Add New User</h3>
                <form onSubmit={handleAddUser} className='form-add'>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={newUser.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={newUser.firstname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={newUser.lastname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={newUser.role}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className='btn'>Přidat</button>
                </form>
            </div>



            </main>
        </div>
    );
}
