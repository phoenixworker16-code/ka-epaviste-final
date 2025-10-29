# Guide de Déploiement - KA Auto Épaves

## 📋 Prérequis

- Compte GitHub
- Compte Vercel
- Compte Neon (PostgreSQL)

## 🚀 Étapes de Déploiement

### 1. Créer une base de données Neon

1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte et un nouveau projet
3. Nommez votre projet : `ka-auto-epaves`
4. Copiez la **Connection String** (DATABASE_URL)

### 2. Préparer le projet pour GitHub

```bash
# Initialiser git si ce n'est pas déjà fait
git init

# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "Initial commit - KA Auto Epaves"

# Créer un repo sur GitHub puis :
git remote add origin https://github.com/VOTRE_USERNAME/ka-auto-epaves.git
git branch -M main
git push -u origin main
```

### 3. Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Add New Project"
3. Importez votre repo GitHub
4. Configurez les variables d'environnement :

```env
DATABASE_URL=votre_url_neon_copiée
JWT_SECRET=ka-auto-epaves-super-secret-key-2024
NEXT_PUBLIC_APP_URL=https://votre-site.vercel.app
```

5. Cliquez sur "Deploy"

### 4. Initialiser la base de données

Après le premier déploiement :

```bash
# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Pousser le schéma vers Neon
npx prisma db push

# Créer l'admin par défaut
npx prisma db seed
```

### 5. Accéder à l'administration

- URL : `https://votre-site.vercel.app/admin/login`
- Email : `admin@votredomaine.fr`
- Mot de passe : `[Configurez votre mot de passe sécurisé]`

⚠️ **IMPORTANT** : Changez le mot de passe après la première connexion !

## 🔧 Commandes Utiles

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Voir la base de données
npx prisma studio

# Créer une migration
npx prisma migrate dev --name nom_migration

# Pousser le schéma sans migration
npx prisma db push
```

## 📝 Variables d'Environnement

### Production (Vercel)
- `DATABASE_URL` : URL de connexion Neon
- `JWT_SECRET` : Clé secrète pour JWT
- `NEXT_PUBLIC_APP_URL` : URL de votre site

### Développement (.env.local)
- `DATABASE_URL` : PostgreSQL local
- `JWT_SECRET` : Clé secrète locale
- `NEXT_PUBLIC_APP_URL` : http://localhost:3000

## 🔐 Sécurité

1. Changez le mot de passe admin par défaut
2. Utilisez un JWT_SECRET fort en production
3. Activez l'authentification à deux facteurs sur Vercel
4. Sauvegardez régulièrement votre base Neon

## 📞 Support

En cas de problème :
- Vérifiez les logs Vercel
- Consultez la documentation Prisma
- Vérifiez la connexion Neon
