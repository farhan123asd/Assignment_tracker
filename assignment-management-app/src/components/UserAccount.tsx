import React, { useState } from 'react';
import { User } from '../types';

const UserAccount: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                // Call registration service
                // await userService.register(username, password);
            } else {
                // Call login service
                // const loggedInUser = await userService.login(username, password);
                // setUser(loggedInUser);
            }
            setError('');
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="user-account">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? 'Switch to Login' : 'Switch to Register'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default UserAccount;