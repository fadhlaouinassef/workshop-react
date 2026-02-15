import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center' }}>
            <img
                src="/notfound.jfif"
                alt="404 Not Found"
                style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{ padding: '20px' }}>
                <h1>404 - Page Not Found</h1>
                <p>Oops! The page you are looking for does not exist.</p>
                <button
                    onClick={() => navigate('/')}
                    style={{ padding: '10px 20px', cursor: 'pointer' }}
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
}
