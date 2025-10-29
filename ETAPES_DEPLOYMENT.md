# 🚀 Étapes de Déploiement - KA Auto Épaves

## ✅ ÉTAPE 1 : Configuration Neon (FAIT)

1. Compte Neon créé ✓
2. Projet créé ✓
3. **À FAIRE** : Copiez votre Connection String et collez-la dans `.env.local`

## 📝 ÉTAPE 2 : Initialiser la Base de Données

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
# 1. Pousser le schéma vers Neon
npx prisma db push

# 2. Créer le compte admin
npx prisma db seed
```

## 📦 ÉTAPE 3 : GitHub Desktop

### 3.1 Ajouter le projet à GitHub Desktop

1. Ouvrez GitHub Desktop
2. Cliquez sur "File" > "Add Local Repository"
3. Cliquez sur "Choose..." et sélectionnez le dossier : `C:\Users\Administrateur\Desktop\v0 vercel\ka-auto-epaves`
4. Si un message dit "This directory does not appear to be a Git repository", cliquez sur "create a repository"

### 3.2 Créer le repository

1. Dans GitHub Desktop, vous verrez tous vos fichiers
2. En bas à gauche, dans "Summary", écrivez : `Initial commit`
3. Cliquez sur "Commit to main"
4. Cliquez sur "Publish repository" en haut
5. Décochez "Keep this code private" si vous voulez un repo public
6. Cliquez sur "Publish repository"

## 🌐 ÉTAPE 4 : Déployer sur Vercel

### 4.1 Connecter GitHub à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Add New..." > "Project"
3. Cliquez sur "Import Git Repository"
4. Sélectionnez votre repo `ka-auto-epaves`
5. Cliquez sur "Import"

### 4.2 Configurer les Variables d'Environnement

Dans la section "Environment Variables", ajoutez :

**Variable 1:**
- Name: `DATABASE_URL`
- Value: `Votre URL Neon complète`

**Variable 2:**
- Name: `JWT_SECRET`
- Value: `ka-auto-epaves-super-secret-key-2024`

**Variable 3:**
- Name: `NEXT_PUBLIC_APP_URL`
- Value: `https://votre-site.vercel.app` (vous l'aurez après le déploiement)

### 4.3 Déployer

1. Cliquez sur "Deploy"
2. Attendez 2-3 minutes
3. Votre site sera en ligne ! 🎉

## 🔐 ÉTAPE 5 : Accéder à l'Admin

1. Allez sur `https://votre-site.vercel.app/admin/login`
2. Email : `admin@votredomaine.fr`
3. Mot de passe : `[Configurez votre mot de passe sécurisé]`

## ⚠️ IMPORTANT

Après le premier déploiement, retournez sur Vercel :
1. Allez dans "Settings" > "Environment Variables"
2. Modifiez `NEXT_PUBLIC_APP_URL` avec votre vraie URL Vercel
3. Redéployez (Settings > Deployments > ... > Redeploy)

## 🎯 Ordre des Commandes

```bash
# Dans le terminal, dossier du projet :

# 1. Initialiser la DB
npx prisma db push

# 2. Créer l'admin
npx prisma db seed

# 3. Tester en local (optionnel)
npm run dev
```

## 📞 En cas de problème

- Vérifiez que DATABASE_URL est correct dans .env.local
- Vérifiez les logs Vercel en cas d'erreur
- Assurez-vous que Neon est bien configuré
