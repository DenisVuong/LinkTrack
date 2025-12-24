# LinkTrack

Application web de création et gestion de liens courts avec système d'analytics détaillé.

## Description

LinkTrack est une application SaaS permettant de raccourcir des URLs longues en liens courts partageables, tout en offrant des statistiques détaillées sur chaque clic (navigateur, appareil, source de trafic, géolocalisation IP).

**Note:** Ceci est un projet éducatif à des fins de démonstration technique. Il ne dispose pas actuellement de fonctionnalités de récupération de mot de passe ou de modification de profil.

## Technologies utilisées

**Backend:**
- Node.js avec Express
- PostgreSQL (conteneurisé avec Docker)
- JWT pour l'authentification
- Bcrypt pour le hachage des mots de passe

**Frontend:**
- React 18 avec Vite
- TailwindCSS pour le styling
- React Router pour la navigation
- Axios pour les requêtes HTTP
- Recharts pour les graphiques d'analytics

## Architecture

```
LinkTrack/
├── backend/
│   ├── database/
│   │   └── schema.sql          # Schéma de la base de données
│   ├── src/
│   │   ├── controllers/        # Logique métier
│   │   ├── models/            # Interraction avec la BDD
│   │   ├── routes/            # Définition des routes API
│   │   ├── middlewares/       # Middlewares (auth, validation)
│   │   ├── services/          # Services (tracking, shortener)
│   │   ├── utils/             # Utilitaires
│   │   └── server.js          # Point d'entrée du serveur
│   └── .env                   # Variables d'environnement
├── frontend/
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   ├── pages/            # Pages de l'application
│   │   ├── services/         # Services API
│   │   └── context/          # Contexte React (Auth)
│   └── package.json
└── docker-compose.yml         # Configuration Docker pour PostgreSQL
```

## Prérequis

- Node.js (version 16 ou supérieure)
- Docker et Docker Compose
- Git

## Installation et lancement en local

### 1. Cloner le repository

```bash
git clone https://github.com/DenisVuong/LinkTrack.git
cd LinkTrack
```

### 2. Configuration de la base de données

Créer un fichier `.env` à la racine du projet backend:

```bash
cd backend
cp .env.example .env
```

Modifier le fichier `.env` avec vos informations:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/linktrack
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=linktrack
JWT_SECRET=votre_secret_jwt_ici
```

### 3. Lancer la base de données PostgreSQL

Depuis la racine du projet:

```bash
docker-compose up -d
```

Cela démarre un conteneur PostgreSQL avec la base de données `linktrack` sur le port 5432.

Vérifier que le conteneur est bien démarré:

```bash
docker ps
```

### 4. Initialiser le schéma de la base de données

Le schéma est automatiquement importé au démarrage du conteneur via le fichier `backend/database/schema.sql`.

Pour vérifier que les tables sont créées:

```bash
docker exec -it linktrack-db psql -U postgres -d linktrack -c "\dt"
```

Vous devriez voir les tables: `users`, `roles`, `user_roles`, `links`, `clicks`.

### 5. Lancer le serveur backend

```bash
cd backend/src
npm install
node server.js
```

Le serveur démarre sur `http://localhost:8080`.

Vous devriez voir:
```
Server is running on port 8080.
```

### 6. Lancer le frontend

Dans un nouveau terminal:

```bash
cd frontend
npm install
npm run dev
```

Le frontend démarre sur `http://localhost:3000`.

Vous devriez voir:
```
VITE v5.x.x  ready in xxx ms
Local:   http://localhost:3000/
```

### 7. Accéder à l'application

Ouvrir votre navigateur et aller sur `http://localhost:3000`.

## Utilisation

### Création d'un compte

1. Sur la page d'accueil, cliquer sur "Connexion" ou "Commencer gratuitement"
2. Aller sur l'onglet "Inscription"
3. Remplir le formulaire avec:
   - Nom d'utilisateur (3-20 caractères)
   - Email valide
   - Mot de passe (minimum 6 caractères)
4. Cliquer sur "Créer mon compte"

### Connexion

1. Aller sur l'onglet "Connexion"
2. Entrer votre nom d'utilisateur et mot de passe
3. Cliquer sur "Se connecter"

Vous êtes redirigé vers le tableau de bord.

### Créer un lien court

1. Dans le dashboard, entrer une URL longue dans le champ de texte
   - L'URL doit commencer par `http://` ou `https://`
2. Cliquer sur "Raccourcir"
3. Le lien court apparaît dans la liste ci-dessous

### Copier un lien

Cliquer sur l'icône de copie à côté du lien court. Un message de confirmation s'affiche.

### Voir les statistiques

1. Cliquer sur "Détails" sur un lien
2. La page d'analytics affiche:
   - Total de clics
   - Visiteurs uniques (par IP)
   - Date du premier et dernier clic
   - Graphique des clics dans le temps
   - Répartition par navigateur (Chrome, Firefox, Safari, etc.)
   - Répartition par type d'appareil (Mobile vs Desktop)
   - Top 5 des sources de trafic (referers)

### Supprimer un lien

1. Cliquer sur l'icône de poubelle
2. Confirmer la suppression

Le lien est supprimé de la base de données et n'est plus accessible.

## Fonctionnement technique

### Système de raccourcissement

Les liens courts sont générés en utilisant un encodage base62 de l'ID du lien dans la base de données. La séquence d'IDs commence à 100000000 pour produire des codes courts (4-5 caractères).

Exemple: ID `100000001` → Short code `G5lM`

### Tracking des clics

Lorsqu'un utilisateur clique sur un lien court (`http://localhost:8080/{short_code}`):

1. Le système récupère l'URL originale depuis la base de données
2. Les informations du clic sont enregistrées de manière asynchrone:
   - Adresse IP (via `request-ip` pour gérer les proxies)
   - User-Agent (navigateur et système d'exploitation)
   - Referer (source du clic)
   - Timestamp
3. Le compteur de visites est incrémenté
4. L'utilisateur est redirigé vers l'URL originale (HTTP 302)

### Authentification

L'authentification utilise JSON Web Tokens (JWT):

1. Lors de la connexion, le serveur génère un token JWT signé avec `JWT_SECRET`
2. Le token est stocké dans le localStorage du navigateur
3. Chaque requête API protégée inclut le token dans le header `x-access-token`
4. Le middleware `authJwt.verifyToken` vérifie la validité du token

### Sécurité

- Mots de passe hashés avec bcrypt (10 rounds)
- Validation des entrées utilisateur
- Protection CORS configurée
- Routes protégées par middleware d'authentification
- Requêtes SQL paramétrées (protection contre injection SQL)

## Structure de la base de données

**Table `users`:**
- `id` (SERIAL PRIMARY KEY)
- `username` (VARCHAR UNIQUE)
- `email` (VARCHAR UNIQUE)
- `password` (VARCHAR) - hash bcrypt
- `created_at` (TIMESTAMP)

**Table `links`:**
- `id` (BIGSERIAL PRIMARY KEY) - commence à 100000000
- `user_id` (INTEGER) - référence vers users
- `original_url` (TEXT)
- `short_code` (VARCHAR UNIQUE)
- `visit_count` (INTEGER)
- `created_at` (TIMESTAMP)

**Table `clicks`:**
- `id` (SERIAL PRIMARY KEY)
- `link_id` (BIGINT) - référence vers links
- `clicked_at` (TIMESTAMP)
- `ip_address` (VARCHAR)
- `user_agent` (TEXT)
- `referer` (TEXT)

**Table `roles`:**
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR) - 'user', 'moderator', 'admin'

**Table `user_roles`:**
- `user_id` (INTEGER)
- `role_id` (INTEGER)

## API Endpoints

### Authentification

**POST `/api/auth/signup`**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**POST `/api/auth/signin`**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```
Retourne: `{ accessToken: "jwt_token", ... }`

### Gestion des liens (nécessite authentification)

**POST `/api/link/`**
Header: `x-access-token: jwt_token`
```json
{
  "original_url": "https://example.com/very-long-url"
}
```

**GET `/api/link/my-links`**
Header: `x-access-token: jwt_token`

Retourne la liste de tous les liens de l'utilisateur.

**GET `/api/link/:short_code/clicks`**
Header: `x-access-token: jwt_token`

Retourne tous les clics pour un lien spécifique.

**DELETE `/api/link/:short_code`**
Header: `x-access-token: jwt_token`

### Redirection publique

**GET `/:short_code`**

Redirige vers l'URL originale et enregistre le clic.

## Dépannage

### Le serveur backend ne démarre pas

Vérifier que PostgreSQL est bien lancé:
```bash
docker ps
```

Vérifier les logs:
```bash
docker logs linktrack-db
```

### Erreur de connexion à la base de données

Vérifier que `DATABASE_URL` dans `.env` correspond à la configuration Docker:
```
postgresql://postgres:password@localhost:5432/linktrack
```

### Port déjà utilisé

Si le port 8080 ou 3000 est déjà utilisé, modifier:
- Backend: variable `PORT` dans `.env`
- Frontend: `server.port` dans `vite.config.js`

### CORS errors

Vérifier que `CORS_ORIGIN` dans `backend/src/server.js` correspond à l'URL du frontend (par défaut `http://localhost:3000`).

## Développement

### Ajouter une migration de base de données

Modifier `backend/database/schema.sql` puis redémarrer le conteneur:

```bash
docker-compose down
docker-compose up -d
```

### Variables d'environnement

**Backend (.env):**
- `DATABASE_URL` - URL de connexion PostgreSQL
- `JWT_SECRET` - Secret pour signer les tokens JWT
- `PORT` - Port du serveur (défaut: 8080)
- `NODE_ENV` - Environnement (development/production)

**Frontend:**
Les variables d'environnement Vite doivent être préfixées par `VITE_`:
- `VITE_API_URL` - URL de l'API backend

## Limitations connues

- Pas de système de récupération de mot de passe
- Pas de modification de profil utilisateur
- Pas de validation par email
- Analytics limités aux données User-Agent (pas de géolocalisation précise)

## Licence

Projet éducatif - Usage de démonstration uniquement.

## Auteur

Denis Vuong - [GitHub](https://github.com/DenisVuong)
