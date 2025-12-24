import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { linkService } from '../services/api';
import { Plus, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import LinkCard from '../components/LinkCard';

const Dashboard = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newUrl, setNewUrl] = useState('');
    const [creating, setCreating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const data = await linkService.getAll();
            setLinks(data);
        } catch (error) {
            toast.error('Erreur lors  du chargement des liens');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateLink = async (e) => {
        e.preventDefault();

        if (!newUrl.trim()) {
            toast.error('Veuillez entrer une URL');
            return;
        }

        if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
            toast.error('L\'URL doit commencer par http:// ou https://');
            return;
        }

        setCreating(true);

        try {
            const newLink = await linkService.create(newUrl);
            setLinks([newLink, ...links]);
            setNewUrl('');
            toast.success('Lien créé avec succès !');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur lors de la création du lien');
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteLink = async (shortCode) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) {
            return;
        }

        try {
            await linkService.delete(shortCode);
            setLinks(links.filter(link => link.short_code !== shortCode));
            toast.success('Lien supprimé avec succès');
        } catch (error) {
            toast.error('Erreur lors de la suppression du lien');
        }
    };

    const handleViewStats = (shortCode) => {
        navigate(`/analytics/${shortCode}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Create Link Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Créer un nouveau lien court</h2>
                    <form onSubmit={handleCreateLink} className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="url"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            placeholder="https://exemple.com/votre-longue-url"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <button
                            type="submit"
                            disabled={creating}
                            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                        >
                            <Plus size={20} />
                            <span>{creating ? 'Création...' : 'Raccourcir'}</span>
                        </button>
                    </form>
                </div>

                {/* Links List */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Mes liens créés</h2>
                        <div className="text-sm text-gray-600">
                            {links.length} {links.length > 1 ? 'liens' : 'lien'}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : links.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LinkIcon className="text-gray-400" size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun lien pour le moment</h3>
                            <p className="text-gray-600">Créez votre premier lien court pour commencer !</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {links.map((link) => (
                                <LinkCard
                                    key={link.id}
                                    link={link}
                                    onDelete={handleDeleteLink}
                                    onViewStats={handleViewStats}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
