# Configuration des variables d'environnement Vercel

## Variables à configurer dans Vercel Dashboard :

1. **DATABASE_URL**
   ```
   postgresql://username:password@host:port/database?sslmode=require
   ```

2. **JWT_SECRET**
   ```
   [Générez une clé secrète forte]
   ```

3. **NEXT_PUBLIC_APP_URL**
   ```
   https://votre-domaine.vercel.app
   ```

## Étapes :
1. Aller sur vercel.com → votre projet
2. Settings → Environment Variables
3. Ajouter ces 3 variables
4. Redéployer le projet

## Note importante :
Le mot de passe de la base de données pourrait avoir expiré. Vérifiez dans votre dashboard Neon et générez une nouvelle URL de connexion si nécessaire.