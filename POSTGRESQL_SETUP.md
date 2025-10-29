# Configuration PostgreSQL

## Installation et Configuration

1. **Installer PostgreSQL** :
   ```bash
   # Télécharger depuis https://www.postgresql.org/download/
   # Ou utiliser chocolatey sur Windows :
   choco install postgresql
   ```

2. **Créer la base de données** :
   ```sql
   CREATE DATABASE ka_auto_epaves;
   CREATE USER ka_user WITH PASSWORD 'votre_mot_de_passe';
   GRANT ALL PRIVILEGES ON DATABASE ka_auto_epaves TO ka_user;
   ```

3. **Configurer .env.local** :
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   ADMIN_USERNAME=votre_admin
   ADMIN_PASSWORD=votre_mot_de_passe_securise
   ```

4. **Initialiser la base de données** :
   ```bash
   npm run setup-db
   ```

## Tables créées

- `users` : Utilisateurs avec authentification
- `removal_requests` : Demandes de retrait d'épaves
- `admin_users` : Administrateurs

## Scripts disponibles

- `npm run setup-db` : Configuration complète
- `npm run test-db` : Test de connexion
- `npm run init-db` : Initialisation des tables

## Migration terminée

✅ Supabase complètement remplacé par PostgreSQL
✅ Toutes les API routes mises à jour
✅ Authentification locale implémentée
✅ Interface admin fonctionnelle