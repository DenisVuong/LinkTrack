import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Créer une instance Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Services Auth
export const authService = {
    signup: async (username, email, password) => {
        const response = await api.post('/auth/signup', { username, email, password });
        return response.data;
    },

    signin: async (username, password) => {
        const response = await api.post('/auth/signin', { username, password });
        if (response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

// Services Links
export const linkService = {
    create: async (originalUrl) => {
        const response = await api.post('/link/', { original_url: originalUrl });
        return response.data;
    },

    getAll: async () => {
        const response = await api.get('/link/my-links');
        return response.data;
    },

    delete: async (shortCode) => {
        const response = await api.delete(`/link/${shortCode}`);
        return response.data;
    }
};

// Helper pour extraire le navigateur
export const extractBrowser = (userAgent) => {
    if (!userAgent) return 'Inconnu';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Chrome') && !userAgent.includes('Edge')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    return 'Autre';
};

// Helper pour détecter mobile
export const isMobile = (userAgent) => {
    if (!userAgent) return false;
    return /Mobile|iPhone|iPad|Android/i.test(userAgent);
};

// Helper pour extraire le domaine depuis une URL
export const extractDomain = (url) => {
    if (!url) return 'Accès direct';
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch {
        return 'Inconnu';
    }
};

export default api;
