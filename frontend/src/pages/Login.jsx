import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Eye, EyeOff, LinkIcon } from 'lucide-react';

const Login = () => {
    const [isLoginTab, setIsLoginTab] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { login, signup, isAuthenticated } = useAuth();

    // Login form
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });

    // Signup form
    const [signupForm, setSignupForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(loginForm.username, loginForm.password);
            toast.success('Connexion réussie !');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (signupForm.password !== signupForm.confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas');
            return;
        }

        if (signupForm.password.length < 6) {
            toast.error('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        setLoading(true);

        try {
            await signup(signupForm.username, signupForm.email, signupForm.password);
            toast.success('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
            setIsLoginTab(true);
            setSignupForm({ username: '', email: '', password: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur lors de la création du compte');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            LinkTrack
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md w-full">
                    {/* Auth Container */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        {/* Logo Section */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                                <LinkIcon className="text-white" size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Bienvenue sur LinkTrack</h2>
                            <p className="text-gray-600 mt-2">
                                {isLoginTab ? 'Connectez-vous à votre compte' : 'Créez un nouveau compte'}
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="flex mb-6">
                            <button
                                onClick={() => setIsLoginTab(true)}
                                className={`flex-1 py-3 px-4 text-center font-medium rounded-lg transition-all ${isLoginTab
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                        : 'text-gray-600 hover:text-gray-900 ml-2 bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                Connexion
                            </button>
                            <button
                                onClick={() => setIsLoginTab(false)}
                                className={`flex-1 py-3 px-4 text-center font-medium rounded-lg transition-all ${!isLoginTab
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                        : 'text-gray-600 hover:text-gray-900 ml-2 bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                Inscription
                            </button>
                        </div>

                        {/* Login Form */}
                        {isLoginTab ? (
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div>
                                    <label htmlFor="login-username" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom d'utilisateur
                                    </label>
                                    <input
                                        type="text"
                                        id="login-username"
                                        value={loginForm.username}
                                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                                        placeholder="Entrez votre nom d'utilisateur"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mot de passe
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="login-password"
                                            value={loginForm.password}
                                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                            placeholder="Entrez votre mot de passe"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-12"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                                >
                                    {loading ? 'Connexion...' : 'Se connecter'}
                                </button>
                            </form>
                        ) : (
                            /* Signup Form */
                            <form onSubmit={handleSignup} className="space-y-6">
                                <div>
                                    <label htmlFor="signup-username" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom d'utilisateur
                                    </label>
                                    <input
                                        type="text"
                                        id="signup-username"
                                        value={signupForm.username}
                                        onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                                        placeholder="Choisissez un nom d'utilisateur"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="signup-email"
                                        value={signupForm.email}
                                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                                        placeholder="votre@email.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mot de passe
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="signup-password"
                                            value={signupForm.password}
                                            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                                            placeholder="Créez un mot de passe"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-12"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">Le mot de passe doit contenir au moins 6 caractères</p>
                                </div>

                                <div>
                                    <label htmlFor="signup-confirm" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirmer le mot de passe
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id="signup-confirm"
                                            value={signupForm.confirmPassword}
                                            onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                                            placeholder="Confirmez votre mot de passe"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-12"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                                >
                                    {loading ? 'Création...' : 'Créer un compte'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <p className="text-gray-600 text-sm">© 2025 LinkTrack. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Login;
