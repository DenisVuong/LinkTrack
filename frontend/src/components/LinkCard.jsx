import React, { useState } from 'react';
import { Copy, Trash2, BarChart3, Check } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const LinkCard = ({ link, onDelete, onViewStats }) => {
    const [copied, setCopied] = useState(false);

    const shortUrl = `http://localhost:8080/${link.short_code}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Erreur lors de la copie:', err);
        }
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd MMM yyyy', { locale: fr });
    };

    const truncateUrl = (url, maxLength = 50) => {
        return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex flex-col space-y-4">
                {/* Short URL */}
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm text-gray-500 mb-1">Lien court</p>
                            <div className="flex items-center space-x-2">
                                <a
                                    href={shortUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-secondary font-medium break-all"
                                >
                                    {shortUrl}
                                </a>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                                    title="Copier"
                                >
                                    {copied ? (
                                        <Check size={18} className="text-green-500" />
                                    ) : (
                                        <Copy size={18} className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Original URL */}
                <div>
                    <p className="text-sm text-gray-500 mb-1">URL originale</p>
                    <p className="text-gray-700" title={link.original_url}>
                        {truncateUrl(link.original_url)}
                    </p>
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div>
                            <span className="font-medium text-primary">{link.visit_count}</span> clics
                        </div>
                        <div>
                            {formatDate(link.created_at)}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => onViewStats(link.short_code)}
                            className="flex items-center space-x-1 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                        >
                            <BarChart3 size={16} />
                            <span>Détails</span>
                        </button>
                        <button
                            onClick={() => onDelete(link.short_code)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Supprimer"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkCard;
