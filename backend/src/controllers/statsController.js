import { getClicksByLinkId } from '../models/clickModel.js';
import linkModel from '../models/linkModel.js';

// Récupérer les statistiques (clicks) d'un lien
export const getLinkClicks = async (req, res) => {
    const { short_code } = req.params;
    const userId = req.user.userId;

    try {
        // Vérifier que le lien appartient à l'utilisateur
        const link = await linkModel.getLinkByShortCode(short_code);

        if (!link) {
            return res.status(404).json({ message: "Lien non trouvé" });
        }

        if (link.user_id !== userId) {
            return res.status(403).json({ message: "Non autorisé" });
        }

        // Récupérer les clicks
        const clicks = await getClicksByLinkId(link.id);

        res.json(clicks);
    } catch (err) {
        console.error('Error fetching link clicks:', err);
        res.status(500).json({ message: "Erreur lors de la récupération des statistiques" });
    }
};
