# 🚀 Guide de Déploiement Sécurisé

## ✅ Pré-requis Avant Déploiement

### 1. Vérification de Sécurité Locale

```bash
# Exécuter le script de vérification
npm run security:check
```

Ce script vérifie :
- ✅ Que `.env.local` n'est pas tracké dans Git
- ✅ Que le README ne contient pas de credentials
- ✅ Que les headers de sécurité sont configurés
- ✅ Que le rate limiting est implémenté

### 2. Nettoyer l'Historique Git (si nécessaire)

Si vous avez accidentellement commité des fichiers sensibles :

```bash
# Vérifier l'historique
git log --all --full-history -- .env.local

# Si trouvé, nettoyer (ATTENTION: destructif)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local .env" \
  --prune-empty --tag-name-filter cat -- --all

# Forcer le push
git push origin --force --all
git push origin --force --tags
```

## 🔐 Configuration des Credentials

### Étape 1: Générer de Nouvelles Credentials

```bash
# Générer un JWT Secret fort
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Copier le résultat, exemple:
# kX9mP2nQ5rS8tU1vW4xY7zA0bC3dE6fG9hJ2kL5mN8pQ1rS4tU7vW0xY3zA6bC9d
```

### Étape 2: Configurer Neon Database

1. Connectez-vous à https://console.neon.tech
2. Créez un nouveau projet ou utilisez un existant
3. Allez dans **Settings** → **Connection Details**
4. Copiez l'URL de connexion (format: `postgresql://user:pass@host/db`)
5. **IMPORTANT**: Activez SSL/TLS

### Étape 3: Configurer Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet (ou créez-en un)
3. **Settings** → **Environment Variables**
4. Ajoutez les variables suivantes :

```
DATABASE_URL = postgresql://user:pass@host/db?sslmode=require
JWT_SECRET = votre-secret-genere-ci-dessus
NEXT_PUBLIC_APP_URL = https://votre-domaine.vercel.app
```

5. Sélectionnez les environnements : **Production**, **Preview**, **Development**

## 📦 Déploiement

### Option 1: Déploiement via Git (Recommandé)

```bash
# 1. Vérifier que tout est propre
git status

# 2. Vérifier la sécurité
npm run security:check

# 3. Commit et push
git add .
git commit -m "feat: déploiement sécurisé"
git push origin main
```

Vercel déploiera automatiquement.

### Option 2: Déploiement via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Déployer
vercel --prod
```

## 🔧 Post-Déploiement

### 1. Initialiser la Base de Données

```bash
# Connectez-vous à votre base Neon via psql ou leur interface web
# Exécutez les scripts dans l'ordre :

# 1. Tables principales
psql $DATABASE_URL -f scripts/001_create_tables.sql

# 2. Storage bucket (si Supabase)
psql $DATABASE_URL -f scripts/002_create_storage_bucket.sql

# 3. Admin user
psql $DATABASE_URL -f scripts/003_create_admin_user.sql

# 4. Tables additionnelles
psql $DATABASE_URL -f scripts/004_additional_tables.sql

# 5. Données de base
psql $DATABASE_URL -f scripts/005_insert_base_data.sql
```

### 2. Créer le Premier Admin

```bash
# Connectez-vous à votre base de données
psql $DATABASE_URL

# Générer un hash bcrypt pour le mot de passe
# Utilisez un outil en ligne ou Node.js:
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('VotreMotDePasseFort123!', 10))"

# Insérer l'admin
INSERT INTO admin_users (id, email, first_name, last_name, role, password_hash)
VALUES (
  gen_random_uuid(),
  'admin@ka-autoepaves.fr',
  'Admin',
  'Principal',
  'super_admin',
  '$2a$10$...' -- votre hash généré ci-dessus
);
```

### 3. Tester le Déploiement

```bash
# Tester la page d'accueil
curl https://votre-domaine.vercel.app

# Tester l'API (doit retourner 401)
curl https://votre-domaine.vercel.app/api/admin/requests

# Tester le login
curl -X POST https://votre-domaine.vercel.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ka-autoepaves.fr","password":"VotreMotDePasse"}'
```

### 4. Vérifier les Logs

1. Vercel Dashboard → votre projet → **Logs**
2. Vérifiez qu'il n'y a pas d'erreurs
3. Testez quelques actions sur le site

### 5. Configurer le Domaine Personnalisé (Optionnel)

1. Vercel Dashboard → votre projet → **Settings** → **Domains**
2. Ajoutez votre domaine : `ka-autoepaves.fr`
3. Suivez les instructions pour configurer les DNS
4. Mettez à jour `NEXT_PUBLIC_APP_URL` dans les variables d'environnement

## 🔒 Sécurité Post-Déploiement

### Checklist de Sécurité

- [ ] HTTPS activé (automatique sur Vercel)
- [ ] Variables d'environnement configurées
- [ ] Base de données accessible uniquement via SSL
- [ ] Admin créé avec mot de passe fort
- [ ] Rate limiting actif sur `/api/admin/login`
- [ ] Headers de sécurité configurés
- [ ] Logs activés
- [ ] Backups configurés sur Neon

### Monitoring

1. **Vercel Analytics** (gratuit)
   - Dashboard → votre projet → **Analytics**
   - Activez les analytics

2. **Neon Monitoring**
   - Console Neon → votre projet → **Monitoring**
   - Surveillez les connexions et requêtes

3. **Alertes**
   - Configurez des alertes email pour :
     - Erreurs 500
     - Pics de trafic inhabituels
     - Tentatives de connexion échouées

## 🆘 Dépannage

### Erreur: "Database connection failed"

```bash
# Vérifier la variable DATABASE_URL
vercel env ls

# Tester la connexion
psql $DATABASE_URL -c "SELECT 1"
```

### Erreur: "JWT malformed"

```bash
# Vérifier JWT_SECRET
vercel env ls

# Régénérer si nécessaire
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Erreur: "Admin not found"

```sql
-- Vérifier les admins
SELECT * FROM admin_users;

-- Créer un admin si nécessaire (voir section 2 ci-dessus)
```

## 📊 Maintenance

### Backups Réguliers

```bash
# Backup manuel
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restauration
psql $DATABASE_URL < backup-20250101.sql
```

### Mises à Jour

```bash
# Mettre à jour les dépendances
npm update

# Vérifier les vulnérabilités
npm audit

# Corriger automatiquement
npm audit fix
```

### Rotation des Secrets

Tous les 3-6 mois :
1. Générer un nouveau JWT_SECRET
2. Mettre à jour sur Vercel
3. Redéployer
4. Les utilisateurs devront se reconnecter

## 📞 Support

En cas de problème :
1. Consultez les logs Vercel
2. Vérifiez les logs Neon
3. Consultez `SECURITY.md` et `URGENT_SECURITY_ACTIONS.md`

---

**Dernière mise à jour** : Janvier 2025
