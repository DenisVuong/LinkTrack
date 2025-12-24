import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Link as LinkIcon, BarChart3, Zap, Lock } from 'lucide-react';

const Home = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Si déjà connecté, rediriger vers dashboard
    React.useEffect(() => {
        if (isAuthenticated()) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            LinkTrack
                        </h1>
                        <Link
                            to="/login"
                            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                            Connexion
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <div className="inline-block mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto">
                            <LinkIcon className="text-white" size={40} />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Raccourcissez vos liens,
                        <br />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            suivez vos performances
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Créez des liens courts professionnels et analysez chaque clic en temps réel avec des statistiques détaillées
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/login"
                            className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all text-lg"
                        >
                            <span>Commencer gratuitement</span>
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                    {/* Feature 1 */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Zap className="text-primary" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Liens courts instantanés</h3>
                        <p className="text-gray-600">
                            Créez des liens en 1 clic et partagez-les partout. Simple, rapide, efficace.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <BarChart3 className="text-green-600" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics détaillés</h3>
                        <p className="text-gray-600">
                            Suivez chaque clic avec des graphiques en temps réel. Analysez vos performances.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <Lock className="text-purple-600" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Sécurisé & Privé</h3>
                        <p className="text-gray-600">
                            Vos données sont protégées et jamais partagées. Confidentialité garantie.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-20 bg-white rounded-2xl shadow-lg border border-gray-200 p-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                                Gratuit
                            </div>
                            <div className="text-gray-600">Usage sans limite</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                                Instantané
                            </div>
                            <div className="text-gray-600">Création en 1 clic</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                                Analytics
                            </div>
                            <div className="text-gray-600">Statistiques détaillées</div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Prêt à commencer ?</h2>
                    <p className="text-white/90 mb-6 text-lg">
                        Créez votre compte gratuit et commencez à raccourcir vos liens dès maintenant
                    </p>
                    <Link
                        to="/login"
                        className="inline-block px-8 py-4 bg-white text-primary rounded-lg font-medium hover:shadow-lg transition-all text-lg"
                    >
                        Créer un compte gratuit
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Home;
