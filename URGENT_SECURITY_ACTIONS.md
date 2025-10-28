# 🚨 ACTIONS DE SÉCURITÉ URGENTES

## ⚠️ VOTRE SITE A DES FAILLES DE SÉCURITÉ CRITIQUES

### 🔴 PRIORITÉ MAXIMALE - À FAIRE IMMÉDIATEMENT

#### 1. VOS CREDENTIALS SONT EXPOSÉES PUBLIQUEMENT

**Problème** : Votre fichier `.env.local` contient :
- URL de base de données Neon avec mot de passe
- JWT Secret
- Ces informations sont potentiellement visibles sur GitHub

**Solution IMMÉDIATE** :

```bash
# 1. Vérifier si .env.local a été commité
git log --all --full-history -- .env.local

# 2. Si OUI, supprimer l'historique (DANGEREUX - faire un backup avant)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local" \
  --prune-empty --tag-name-filter cat -- --all

# 3. Forcer le push
git push origin --force --all
```

#### 2. CHANGER IMMÉDIATEMENT VOS CREDENTIALS

**Base de données Neon** :
1. Connectez-vous à https://console.neon.tech
2. Allez dans votre projet
3. Settings → Reset password
4. Copiez la nouvelle URL de connexion
5. Mettez à jour `.env.local` (LOCAL SEULEMENT)
6. Mettez à jour Vercel (Settings → Environment Variables)

**JWT Secret** :
```bash
# Générer un nouveau secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### 3. VÉRIFIER GITHUB

```bash
# Vérifier que .env.local n'est PAS sur GitHub
git ls-files | grep .env

# Si vous voyez .env.local, c'est CRITIQUE
```

### 🟡 PRIORITÉ HAUTE - À FAIRE AUJOURD'HUI

#### 4. Sécuriser Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. Settings → Environment Variables
4. Ajoutez (si pas déjà fait) :
   - `DATABASE_URL` = votre nouvelle URL Neon
   - `JWT_SECRET` = votre nouveau secret
   - `NEXT_PUBLIC_APP_URL` = votre URL de production

5. Redéployez :
```bash
vercel --prod
```

#### 5. Activer les Protections Neon

1. Dashboard Neon → votre projet
2. Settings → Security
3. Activez :
   - [ ] IP Allow List (ajoutez les IPs de Vercel)
   - [ ] Connection pooling
   - [ ] SSL/TLS enforcement

#### 6. Créer un Admin Sécurisé

```bash
# Connectez-vous à votre base Neon
# Créez un admin avec un mot de passe FORT

# Générer un mot de passe fort
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"

# Utilisez ce mot de passe pour créer votre admin
```

### 🟢 PRIORITÉ MOYENNE - Cette Semaine

#### 7. Audit de Sécurité Complet

```bash
# Installer les outils d'audit
npm install -g npm-audit
npm audit

# Corriger les vulnérabilités
npm audit fix
```

#### 8. Configurer les Logs

1. Vercel Dashboard → votre projet
2. Logs → Configure
3. Activez les alertes pour :
   - Erreurs 500
   - Tentatives de connexion échouées
   - Accès non autorisés

#### 9. Backups

1. Neon Dashboard → Backups
2. Configurez des backups automatiques quotidiens
3. Testez la restauration

### ✅ CHECKLIST DE VÉRIFICATION

Avant de considérer votre site sécurisé :

- [ ] `.env.local` n'est PAS sur GitHub
- [ ] Toutes les credentials ont été changées
- [ ] Nouvelles credentials configurées sur Vercel
- [ ] Site redéployé avec nouvelles credentials
- [ ] Test de connexion admin réussi
- [ ] Rate limiting activé sur /api/admin/login
- [ ] Headers de sécurité configurés
- [ ] HTTPS activé (automatique sur Vercel)
- [ ] Backups configurés
- [ ] Logs activés

### 📞 EN CAS DE PROBLÈME

Si vous avez des difficultés :

1. **NE PANIQUEZ PAS**
2. Mettez le site en maintenance temporairement
3. Prenez le temps de tout faire correctement
4. Testez en local avant de déployer

### 🔍 VÉRIFIER SI VOUS AVEZ ÉTÉ COMPROMIS

```sql
-- Connectez-vous à votre base Neon et exécutez :

-- Vérifier les demandes suspectes
SELECT * FROM removal_requests 
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Vérifier les admins
SELECT * FROM admin_users;

-- Si vous voyez des données suspectes, contactez immédiatement Neon
```

### 📚 RESSOURCES

- [Neon Security Best Practices](https://neon.tech/docs/security)
- [Vercel Security](https://vercel.com/docs/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**IMPORTANT** : Ne supprimez pas ce fichier tant que toutes les actions ne sont pas complétées.
