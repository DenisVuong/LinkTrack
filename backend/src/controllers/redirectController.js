import linkModel from '../models/linkModel.js';
import trackingService from '../services/trackingService.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const redirectToOriginalUrl = async (req, res) => {
    const short_code = req.params.short_code;

    if (!short_code) {
        return res.status(400).send('Invalid short code');
    }

    try {
        // Rechercher le lien dans la base de données
        const link = await linkModel.getLinkByShortCode(short_code);

        if (!link) {
            return res.status(404).sendFile(path.join(__dirname, '../views/404.html'));
        }

        // Lancer le tracking 
        trackingService.trackClick(link.id, req).catch(err => {
            console.error('Tracking failed (non-blocking):', err);
        });

        // Redirige l'utilisateur 
        return res.redirect(302, link.original_url);

    } catch (err) {
        console.error('Error redirecting link:', err);
        return res.status(500).send('An error occurred while redirecting');
    }
};
