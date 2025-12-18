# 🔗 LinkTrack

> **LinkTrack** est une plateforme B2B qui permet aux entreprises de raccourcir leurs liens marketing et d'analyser leur audience (clics, dates, appareils) via un tableau de bord visuel.

🚧 **État du projet :** En cours de développement (Phase 2 - Backend)

---

## 🛠️ Stack Technique

*   **Backend :** Node.js (Express), ES Modules
*   **Base de données :** PostgreSQL (Relationnel strict)
*   **Frontend :** React (Prévu)
*   **Outils :** Git, Postman

## 🚀 Prérequis

*   Node.js (v18+)
*   PostgreSQL (Local ou Docker)

## 📂 Structure du projet

```
LinkTrack/
├── backend/            # API Node.js/Express
│   ├── src/
│   │   ├── config/     # Connexion DB
│   │   ├── controllers/
│   │   ├── middleWares/# Auth JWT
│   │   ├── models/     # Requêtes SQL brutes
│   │   ├── routes/
│   │   └── utils/      # Algorithme de raccourcissement
│   ├── database/       # Schéma SQL
│   └── server.js
└── ...
```

## ⚙️ Installation & Démarrage (Backend)

1.  **Cloner le projet**
    ```bash
    git clone https://github.com/DenisVuong/LinkTrack.git
    cd LinkTrack
    ```

2.  **Configuration Environnement**
    Créer un fichier `.env` dans le dossier `backend` :
    ```env
    PORT=3000
    DATABASE_URL=postgres://user:password@localhost:5432/linktrack
    JWT_SECRET=votre_secret_tres_long
    ```

3.  **Installation des dépendances**
    ```bash
    cd backend
    npm install
    ```

4.  **Base de données**
    Exécuter les scripts SQL situés dans `backend/database/schema.sql` pour initialiser les tables (`users`, `roles`, `links`, etc.).

5.  **Lancer le serveur**
    ```bash
    npm run dev
    ```

## 🔌 API Endpoints (Aperçu)

### Authentification
*   `POST /api/auth/signup` : Créer un compte
*   `POST /api/auth/signin` : Se connecter (Retourne Access Token)

### Gestion des Liens (En cours)
*   `POST /api/links` : Raccourcir une URL (Authentifié)
*   `GET /api/links/me` : Voir mes liens (Authentifié)
*   `DELETE /api/links/:id` : Supprimer un lien (Authentifié)

---
*Développé avec ❤️ par Denis Vuong*
