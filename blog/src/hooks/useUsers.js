import { useState, useEffect } from 'react';
import axios from 'axios';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null); 
    const [newUser, setNewUser] = useState({
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        role: '',
        email: '',
    });
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:8000/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    };

    const fetchUserById = (id) => {
        axios.get(`http://localhost:8000/users/${id}`)
            .then(response => setCurrentUser(response.data))
            .catch(error => console.error('Error fetching user by ID:', error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingUser({
            ...editingUser,
            [name]: value,
        });
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/users', newUser)
            .then(response => {
                setUsers([...users, response.data]);
                setNewUser({
                    username: '',
                    firstname: '',
                    lastname: '',
                    password: '',
                    role: '',
                    email: '',
                });
            })
            .catch(error => console.error('Error adding user:', error));
    };


    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/users/${editingUser.id}`, editingUser)
            .then(response => {
                setUsers(users.map(user =>
                    user.id === editingUser.id ? response.data : user
                ));
                setEditingUser(null);
            })
            .catch(error => console.error('Error updating user:', error));
    };

    const handleDeleteUser = (userId) => {
        axios.delete(`http://localhost:8000/users/${userId}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    return {
        users,
        newUser,
        editingUser,
        currentUser,
        fetchUserById,
        handleChange,
        handleEditChange,
        handleAddUser,
        handleEdit,
        handleUpdateUser,
        handleDeleteUser,
    };
};

export default useUsers;
