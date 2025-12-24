import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Trash2, Users, MousePointerClick, Calendar, Clock, Check } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';
import api, { linkService, extractBrowser, isMobile, extractDomain } from '../services/api';
import Header from '../components/Header';

const Analytics = () => {
    const { shortCode } = useParams();
    const navigate = useNavigate();
    const [link, setLink] = useState(null);
    const [clicks, setClicks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchAnalytics();
    }, [shortCode]);

    const fetchAnalytics = async () => {
        try {
            // Récup les  liens (contient visit_count et autres infos)
            const linksData = await linkService.getAll();
            const currentLink = linksData.find(l => l.short_code === shortCode);

            if (!currentLink) {
                toast.error('Lien introuvable');
                navigate('/dashboard');
                return;
            }

            setLink(currentLink);

            // Récup les clicks pour ce lien (à faire via une requête SQL depuis le backend)
            // Pour l'instant, on simule avec un endpoint API
            try {
                const response = await api.get(`/link/${shortCode}/clicks`);
                setClicks(response.data || []);
            } catch {
                // Si l'endpoint n'existe pas encore, on utilise des données vides
                setClicks([]);
            }

        } catch (error) {
            toast.error('Erreur lors du chargement des statistiques');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        const shortUrl = `http://localhost:8080/${shortCode}`;
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            toast.success('Lien copié !');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('Erreur lors de la copie');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) {
            return;
        }

        try {
            await linkService.delete(shortCode);
            toast.success('Lien supprimé');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Erreur lors de la suppression');
        }
    };

    // Calcul des KPIs
    const totalClicks = link?.visit_count || 0;
    const uniqueVisitors = new Set(clicks.map(c => c.ip_address)).size;
    const firstClick = clicks.length > 0 ? new Date(clicks[clicks.length - 1].clicked_at) : null;
    const lastClick = clicks.length > 0 ? new Date(clicks[0].clicked_at) : null;

    // Données pour graphique clics dans le temps
    const clicksByDate = clicks.reduce((acc, click) => {
        const date = format(new Date(click.clicked_at), 'dd MMM', { locale: fr });
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const timelineData = Object.entries(clicksByDate).map(([date, clicks]) => ({
        date,
        clics: clicks
    }));

    // Données pour graphique navigateurs
    const browserData = clicks.reduce((acc, click) => {
        const browser = extractBrowser(click.user_agent);
        acc[browser] = (acc[browser] || 0) + 1;
        return acc;
    }, {});

    const browsersChartData = Object.entries(browserData).map(([name, value]) => ({
        name,
        value
    }));

    // Données pour graphique mobile vs desktop
    const deviceData = clicks.reduce((acc, click) => {
        const device = isMobile(click.user_agent) ? 'Mobile' : 'Desktop';
        acc[device] = (acc[device] || 0) + 1;
        return acc;
    }, {});

    const devicesChartData = Object.entries(deviceData).map(([name, value]) => ({
        name,
        value
    }));

    // Données pour top referers
    const refererData = clicks.reduce((acc, click) => {
        const source = extractDomain(click.referer);
        acc[source] = (acc[source] || 0) + 1;
        return acc;
    }, {});

    const referersChartData = Object.entries(refererData)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([source, clics]) => ({ source, clics }));

    const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!link) {
        return null;
    }

    const shortUrl = `http://localhost:8080/${shortCode}`;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Retour au tableau de bord</span>
                    </button>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <a
                                        href={shortUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xl font-bold text-primary hover:text-secondary"
                                    >
                                        {shortUrl}
                                    </a>
                                    <button onClick={handleCopy} className="p-2 hover:bg-gray-100 rounded transition-colors">
                                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-gray-500" />}
                                    </button>
                                </div>
                                <p className="text-gray-600 text-sm break-all">{link.original_url}</p>
                                <p className="text-gray-500 text-xs mt-2">
                                    Créé le {format(new Date(link.created_at), 'dd MMMM yyyy', { locale: fr })}
                                </p>
                            </div>
                            <button
                                onClick={handleDelete}
                                className="flex items-center space-x-2 px-4 py-2 text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={18} />
                                <span>Supprimer</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Total de clics</p>
                                <p className="text-3xl font-bold text-primary">{totalClicks}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <MousePointerClick className="text-primary" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Visiteurs uniques</p>
                                <p className="text-3xl font-bold text-green-600">{uniqueVisitors}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Users className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text- sm mb-1">Premier clic</p>
                                <p className="text-lg font-bold text-purple-600">
                                    {firstClick ? format(firstClick, 'dd MMM', { locale: fr }) : 'Aucun'}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Calendar className="text-purple-600" size={24} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Dernier clic</p>
                                <p className="text-lg font-bold text-orange-600">
                                    {lastClick ? format(lastClick, 'dd MMM', { locale: fr }) : 'Aucun'}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Clock className="text-orange-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {clicks.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-600">Aucun clic pour le moment. Partagez votre lien pour voir les statistiques !</p>
                    </div>
                ) : (
                    <>
                        {/* Graphique Timeline */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Clics dans le temps</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={timelineData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="clics" stroke="#667eea" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Graphique Navigateurs */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Navigateurs</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={browsersChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={(entry) => `${entry.name}: ${entry.value}`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {browsersChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Graphique Devices */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Appareils</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={devicesChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={(entry) => `${entry.name}: ${entry.value}`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {devicesChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Top Sources */}
                        {referersChartData.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Top sources de trafic</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={referersChartData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="source" type="category" width={150} />
                                        <Tooltip />
                                        <Bar dataKey="clics" fill="#667eea" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Analytics;
