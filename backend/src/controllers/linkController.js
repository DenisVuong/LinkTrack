import linkModel from '../models/linkModel.js';
import { shortlink } from '../utils/shortener.js';

export const createLink = async (req, res) => {
    const { original_url } = req.body;
    const userId = req.user.userId;

    if (!original_url) {
        return res.status(400).json({ error: "URL is required" });
    }

    if (!original_url.startsWith('http://') && !original_url.startsWith('https://')) {
        return res.status(400).json({ error: "Invalid URL format. Must start with http:// or https://" });
    }

    try {
        // On demande prochain ID
        const nextId = await linkModel.getNextId();

        // Crée le shorturl
        const short_code = shortlink(nextId);
        const newLink = await linkModel.insertLink(nextId, userId, original_url, short_code);

        res.status(201).json(newLink);
    } catch (err) {
        console.error('Error creating link:', err);
        res.status(500).json({ message: "An error occurred while creating the link" });
    }
}

export const getMyLinks = async (req, res) => {
    const userId = req.user.userId;

    if (!userId) {
        return res.status(400).json({ error: "User not found!" });
    }

    try {
        const allLinks = await linkModel.getAllLinks(userId);

        res.status(200).json(allLinks);
    } catch (err) {
        console.error('Error retrieving links:', err);
        res.status(500).json({ message: "An error occurred while retrieving links" });
    }
}

export const deleteLink = async (req, res) => {
    const shortCode = req.params.short_code;
    const userId = req.user.userId;

    try {
        const deletedLink = await linkModel.deleteLink(shortCode, userId);

        if (!deletedLink) {
            return res.status(404).json({ message: "Link not found or not authorized" });
        }

        res.status(200).json({ message: "Link deleted successfully" });
    } catch (err) {
        console.error('Error deleting link:', err);
        res.status(500).json({ message: "An error occurred while deleting the link" });
    }
}