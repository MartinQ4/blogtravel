import { useState } from 'react';

export const useAuthenticate = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const authenticateUser = async (username, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/users');
            const users = await response.json();

            const user = users.find(
                (user) => user.username === username && user.password === password
            );

            setLoading(false);

            if (user) {
                return { success: true, user };
            } else {
                return { success: false, message: 'Invalid credentials' };
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
            setError('Something went wrong. Please try again.');
            return { success: false, message: 'Something went wrong. Please try again.' };
        }
    };

    return { authenticateUser, loading, error };
};
