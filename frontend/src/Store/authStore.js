import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    // Initialize token from LocalStorage if it exists
    token: localStorage.getItem('db_token') || null,
    user: JSON.parse(localStorage.getItem('db_user')) || null,
    isAuthenticated: !!localStorage.getItem('db_token'),

    // Login Action
    login: (userData, token) => {
        localStorage.setItem('db_token', token);
        localStorage.setItem('db_user', JSON.stringify(userData));
        
        set({ 
            user: userData, 
            token: token, 
            isAuthenticated: true 
        });
    },

    // Logout Action
    logout: () => {
        localStorage.removeItem('db_token');
        localStorage.removeItem('db_user');
        
        set({ 
            user: null, 
            token: null, 
            isAuthenticated: false 
        });
    }
}));