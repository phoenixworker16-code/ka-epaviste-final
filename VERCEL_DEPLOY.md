# 🚀 Déploiement Vercel - Guide Rapide

## ✅ Corrections Appliquées

- ✅ Script `prebuild` désactivé (bloquait le build)
- ✅ Code pushé sur GitHub
- ✅ Prêt pour le déploiement

---

## 📋 Configuration Vercel

### 1. Framework & Build

```
Framework Preset:     Next.js ✓
Build Command:        [Laissez vide]
Output Directory:     [Laissez vide]
Install Command:      [Laissez vide]
```

### 2. Variables d'Environnement

Ajoutez ces 3 variables dans Vercel :

| Key | Value | Environnements |
|-----|-------|----------------|
| `DATABASE_URL` | Votre URL Neon complète | ☑ Production ☑ Preview ☑ Development |
| `JWT_SECRET` | `[Générez votre propre clé secrète]` | ☑ Production ☑ Preview ☑ Development |
| `NEXT_PUBLIC_APP_URL` | `https://votre-projet.vercel.app` | ☑ Production |

**⚠️ Important** : 
- Remplacez `votre-projet.vercel.app` par votre vraie URL Vercel
- Utilisez votre DATABASE_URL complète avec le nouveau mot de passe

---

## 🚀 Étapes de Déploiement

### Option 1 : Depuis le Dashboard Vercel

1. Allez sur https://vercel.com/new
2. Importez votre repo GitHub
3. Configurez les variables d'environnement
4. Cliquez **Deploy**

### Option 2 : Redéployer un Projet Existant

1. Dashboard Vercel → Votre projet
2. **Settings** → **Environment Variables**
3. Ajoutez/Modifiez les 3 variables
4. **Deployments** → **Redeploy**

---

## ✅ Vérification Post-Déploiement

Une fois déployé :

1. **Tester la page d'accueil**
   ```
   https://votre-projet.vercel.app
   ```

2. **Tester le login admin**
   ```
   https://votre-projet.vercel.app/admin/login
   ```

3. **Vérifier les logs**
   - Dashboard Vercel → Deployments → Logs

---

## 🗄️ Initialiser la Base de Données

Après le premier déploiement réussi :

### Via Neon SQL Editor

1. Connectez-vous à https://console.neon.tech
2. Ouvrez le **SQL Editor**
3. Exécutez dans l'ordre :

```sql
-- 1. Tables principales
-- Copiez le contenu de scripts/001_create_tables.sql

-- 2. Tables additionnelles
-- Copiez le contenu de scripts/004_additional_tables.sql

-- 3. Données de base
-- Copiez le contenu de scripts/005_insert_base_data.sql
```

### Créer l'Admin

```sql
-- Générez d'abord un hash bcrypt localement :
-- node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('VotreMotDePasseFort123!', 10))"

INSERT INTO admin_users (id, email, password, first_name, last_name, role)
VALUES (
  gen_random_uuid(),
  'admin@votredomaine.fr',
  '$2a$10$...', -- votre hash généré
  'Admin',
  'Principal',
  'super_admin'
);
```

---

## 🔍 Dépannage

### Erreur : "Database connection failed"

✅ **Solution** :
- Vérifiez que `DATABASE_URL` est correcte dans Vercel
- Vérifiez que la base Neon est active
- Testez la connexion : `psql $DATABASE_URL -c "SELECT 1"`

### Erreur : "Prisma Client not generated"

✅ **Solution** :
- Le script `postinstall` devrait le faire automatiquement
- Si problème persiste, ajoutez dans Vercel :
  - Build Command : `prisma generate && next build`

### Erreur : "JWT malformed"

✅ **Solution** :
- Vérifiez que `JWT_SECRET` est identique local et Vercel
- Pas d'espaces avant/après la valeur

---

## 📊 Checklist Finale

- [ ] Code pushé sur GitHub
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Déploiement réussi (build vert ✓)
- [ ] Site accessible en ligne
- [ ] Base de données initialisée
- [ ] Admin créé
- [ ] Login admin fonctionne
- [ ] Formulaire de demande fonctionne

---

## 🎉 Félicitations !

Votre site est maintenant en ligne et sécurisé ! 🔒

**Prochaines étapes** :
- Configurez un domaine personnalisé
- Activez les backups Neon
- Configurez les alertes Vercel
- Testez toutes les fonctionnalités

---

**Besoin d'aide ?** Consultez les logs Vercel ou la documentation Neon.
