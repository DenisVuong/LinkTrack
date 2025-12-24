import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <p className="text-gray-600 text-sm">© 2025 LinkTrack. Tous droits réservés.</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                            Politique de confidentialité
                        </a>
                        <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                            Conditions d'utilisation
                        </a>
                        <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                            Support
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
