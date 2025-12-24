# LinkTrack Frontend - React + TailwindCSS

Frontend React complet pour l'application LinkTrack, entièrement en français et connecté au backend.

## 🚀 Démarrage rapide

### Prérequis
- Node.js >= 16
- Backend LinkTrack en cours d'exécution sur `http://localhost:8080`

### Installation

```bash
cd frontend
npm install
```

### Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Build pour production

```bash
npm run build
```

## 📁 Structure du projet

```
frontend/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Header.jsx       # Header avec déconnexion
│   │   ├── Footer.jsx       # Footer
│   │   ├── ProtectedRoute.jsx # Protection des routes
│   │   └── LinkCard.jsx     # Card pour afficher un lien
│   │
│   ├── pages/              # Pages principales
│   │   ├── Login.jsx       # Connexion/Inscription
│   │   ├── Dashboard.jsx   # Création et gestion des liens
│   │   └── Analytics.jsx   # Statistiques avec graphiques
│   │
│   ├── services/           # API calls
│   │   └── api.js          # Service Axios + helpers
│   │
│   ├── context/            # State management
│   │   └── AuthContext.jsx # Contexte d'authentification
│   │
│   ├── App.jsx             # Composant principal + routing
│   ├── main.jsx            # Point d'entrée
│   └── index.css           # Styles Tailwind
│
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Fonctionnalités

### Page Login (`/login`)
- Tabs pour basculer entre Connexion et Inscription
- Formulaire de connexion : username + password
- Formulaire d'inscription : username + email + password + confirm
- Validation des champs
- Afficher/masquer mot de passe
- Messages d'erreur en français

### Page Dashboard (`/dashboard`)
- Créer un nouveau lien court
- Liste de tous les liens créés
- Copier le lien court en 1 clic
- Voir les statistiques détaillées
- Supprimer un lien (avec confirmation)
- État vide si aucun lien

### Page Analytics (`/analytics/:shortCode`)
- 4 KPIs : Total clics, Visiteurs uniques, Premier clic, Dernier clic
- Graphique ligne : Clics dans le temps
- Graphique camembert : Répartition par navigateur
- Graphique camembert : Mobile vs Desktop
- Graphique barres : Top 5 sources de trafic (referers)
- Copier/Supprimer le lien

## 🔌 Connexion au Backend

L'application se connecte au backend via Axios sur `http://localhost:8080/api`

### Endpoints utilisés
- `POST /api/auth/signup` - Créer un compte
- `POST /api/auth/signin` - Se connecter (retourne un JWT)
- `POST /api/link/` - Créer un lien (auth requise)
- `GET /api/link/my-links` - Récupérer tous mes liens (auth requise)
- `DELETE /api/link/:short_code` - Supprimer un lien (auth requise)

### Authentification
Le token JWT est stocké dans `localStorage` et automatiquement ajouté aux requêtes via un intercepteur Axios (header `x-access-token`).

## 🎨 Design

- **Palette de couleurs**
  - Primaire : `#667eea` (bleu/violet)
  - Secondaire : `#764ba2` (violet)
  - Accent : `#f093fb`

- **Typographie** : Inter (Google Fonts)

- **Style** : Design moderne avec TailwindCSS, cartes avec ombres, boutons gradient, animations douces

## 📦 Technologies

- **React 18** avec Vite
- **React Router DOM 6** pour le routing
- **Tailwind CSS 3** pour le styling
- **Axios** pour les requêtes HTTP
- **react-hot-toast** pour les notifications
- **Recharts** pour les graphiques
- **Lucide React** pour les icônes
- **date-fns** pour le formatage des dates

## 🧪 Test de l'application

1. Assurez-vous que le backend est lancé : `http://localhost:8080`
2. Lancez le frontend : `npm run dev`
3. Créez un compte sur `/login`
4. Connectez-vous
5. Créez un lien court
6. Copiez le lien et ouvrez-le dans un nouvel onglet
7. Retournez au dashboard et cliquez sur "Détails"
8. Visualisez les statistiques
9. Supprimez le lien

## ⚠️ Notes

- Le frontend est **entièrement en français**
- Les routes protégées redirigent vers `/login` si non authentifié
- Les graphiques sont vides si aucun clic n'a été enregistré
- Le parsing du User-Agent est fait côté frontend (simple détection navigateur/device)

## 🐛 Dépannage

**Erreur "Module not found"** : Vérifiez que `npm install` a bien été exécuté

**Erreur "Network Error"** : Vérifiez que le backend est bien lancé sur port 8080

**Token expiré** : Reconnectez-vous, le token sera rafraîchi

**CORS Error** : Le backend doit autoriser les requêtes depuis `http://localhost:3000`

## 📝 À faire (optionnel)

- [ ] Ajouter un endpoint backend `/api/link/:shortCode/clicks` pour récupérer les clicks
- [ ] Implémenter le tri de la liste des liens
- [ ] Ajouter un filtre/recherche dans la liste
- [ ] Pagination si beaucoup de liens
- [ ] Dark mode
- [ ] QR Code pour chaque lien
- [ ] Export CSV des stats
