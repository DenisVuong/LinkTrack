import requestIp from 'request-ip';
import { insertClick } from '../models/clickModel.js';
import linkModel from '../models/linkModel.js';

/**
 * Fonction principale de tracking
 * Enregistre un clic et met à jour les statistiques
 * Cette fonction est fire-and-forget (pas de await dans le controller)
 */
const trackClick = async (linkId, req) => {
    try {
        // Récupérer les informations de la requête
        const ipAddress = extractIpAddress(req);
        const userAgent = parseUserAgent(req);
        const referer = getReferer(req);

        // Enregistrer le clic dans la base de données
        await insertClick(linkId, ipAddress, userAgent, referer);

        // Incrémenter le compteur de visites
        await linkModel.incrementVisitCount(linkId);

        console.log(`✅ Click tracked for link ${linkId}`);
    } catch (err) {
        // Ne pas faire crasher l'app si le tracking échoue
        console.error('❌ Error tracking click:', err);
    }
};

/**
 * Extrait l'adresse IP de la requête
 * Gère les proxies et les CDN (Cloudflare, Nginx, etc.)
 */
const extractIpAddress = (req) => {
    try {
        // request-ip gère automatiquement X-Forwarded-For et autres headers
        const ip = requestIp.getClientIp(req);
        return ip || 'unknown';
    } catch (err) {
        console.error('Error extracting IP:', err);
        return 'unknown';
    }
};

/**
 * Récupère le User-Agent de la requête
 * Contient les infos sur le navigateur, OS, appareil
 */
const parseUserAgent = (req) => {
    try {
        const userAgent = req.headers['user-agent'];
        return userAgent || 'Unknown';
    } catch (err) {
        console.error('Error parsing User-Agent:', err);
        return 'Unknown';
    }
};

/**
 * Récupère le Referer (d'où vient l'utilisateur)
 * Peut être null si accès direct
 */
const getReferer = (req) => {
    try {
        // "referer" est l'orthographe officielle (erreur dans le standard HTTP)
        // Mais certains clients utilisent "referrer"
        const referer = req.headers['referer'] || req.headers['referrer'];
        return referer || null;
    } catch (err) {
        console.error('Error getting referer:', err);
        return null;
    }
};

export default {
    trackClick,
    extractIpAddress,
    parseUserAgent,
    getReferer
};
