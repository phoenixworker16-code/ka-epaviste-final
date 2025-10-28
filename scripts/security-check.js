const fs = require('fs')
const path = require('path')

console.log('🔒 Vérification de sécurité KA Auto Épaves\n')

let issues = []
let warnings = []
let passed = []

// 1. Vérifier .gitignore
console.log('1️⃣  Vérification du .gitignore...')
const gitignorePath = path.join(__dirname, '..', '.gitignore')
if (fs.existsSync(gitignorePath)) {
  const gitignore = fs.readFileSync(gitignorePath, 'utf8')
  if (gitignore.includes('.env') && gitignore.includes('.env*.local')) {
    passed.push('✅ .gitignore contient .env et .env*.local')
  } else {
    issues.push('❌ .gitignore ne protège pas correctement les fichiers .env')
  }
} else {
  issues.push('❌ Fichier .gitignore manquant')
}

// 2. Vérifier que .env.local n'est pas tracké
console.log('2️⃣  Vérification des fichiers sensibles...')
const { execSync } = require('child_process')
try {
  const trackedFiles = execSync('git ls-files', { encoding: 'utf8' })
  if (trackedFiles.includes('.env.local') || trackedFiles.includes('.env')) {
    issues.push('🚨 CRITIQUE: Fichier .env tracké dans Git!')
  } else {
    passed.push('✅ Aucun fichier .env tracké dans Git')
  }
} catch (error) {
  warnings.push('⚠️  Impossible de vérifier Git (pas un repo Git?)')
}

// 3. Vérifier les variables d'environnement
console.log('3️⃣  Vérification des variables d\'environnement...')
const envLocalPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8')
  
  // Vérifier JWT_SECRET
  if (envContent.includes('JWT_SECRET')) {
    const jwtMatch = envContent.match(/JWT_SECRET="([^"]+)"/)
    if (jwtMatch) {
      const secret = jwtMatch[1]
      if (secret.length < 32) {
        issues.push('❌ JWT_SECRET trop court (minimum 32 caractères)')
      } else if (secret.includes('secret') || secret.includes('test') || secret.includes('demo')) {
        warnings.push('⚠️  JWT_SECRET semble être un exemple, changez-le!')
      } else {
        passed.push('✅ JWT_SECRET présent et semble sécurisé')
      }
    }
  } else {
    issues.push('❌ JWT_SECRET manquant dans .env.local')
  }
  
  // Vérifier DATABASE_URL
  if (envContent.includes('DATABASE_URL')) {
    passed.push('✅ DATABASE_URL configurée')
  } else {
    issues.push('❌ DATABASE_URL manquante')
  }
} else {
  warnings.push('⚠️  Fichier .env.local non trouvé (normal si pas encore configuré)')
}

// 4. Vérifier README.md
console.log('4️⃣  Vérification du README.md...')
const readmePath = path.join(__dirname, '..', 'README.md')
if (fs.existsSync(readmePath)) {
  const readme = fs.readFileSync(readmePath, 'utf8')
  
  if (readme.includes('test@123') || readme.includes('admin@ka-autoepaves.fr')) {
    issues.push('🚨 CRITIQUE: Credentials dans README.md!')
  } else {
    passed.push('✅ Pas de credentials dans README.md')
  }
  
  if (readme.includes('DATABASE_URL') || readme.includes('postgresql://')) {
    issues.push('🚨 CRITIQUE: URL de base de données dans README.md!')
  } else {
    passed.push('✅ Pas d\'URL de base de données dans README.md')
  }
} else {
  warnings.push('⚠️  README.md non trouvé')
}

// 5. Vérifier next.config.mjs
console.log('5️⃣  Vérification de next.config.mjs...')
const nextConfigPath = path.join(__dirname, '..', 'next.config.mjs')
if (fs.existsSync(nextConfigPath)) {
  const nextConfig = fs.readFileSync(nextConfigPath, 'utf8')
  
  if (nextConfig.includes('X-Frame-Options')) {
    passed.push('✅ Headers de sécurité configurés')
  } else {
    warnings.push('⚠️  Headers de sécurité manquants dans next.config.mjs')
  }
} else {
  warnings.push('⚠️  next.config.mjs non trouvé')
}

// 6. Vérifier rate-limit.ts
console.log('6️⃣  Vérification du rate limiting...')
const rateLimitPath = path.join(__dirname, '..', 'lib', 'rate-limit.ts')
if (fs.existsSync(rateLimitPath)) {
  passed.push('✅ Rate limiting implémenté')
} else {
  warnings.push('⚠️  Rate limiting non implémenté')
}

// 7. Vérifier les dépendances
console.log('7️⃣  Vérification des dépendances...')
const packageJsonPath = path.join(__dirname, '..', 'package.json')
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }
  
  if (deps['bcryptjs'] || deps['bcrypt']) {
    passed.push('✅ Bcrypt installé pour le hashing des mots de passe')
  } else {
    issues.push('❌ Bcrypt manquant')
  }
  
  if (deps['jsonwebtoken']) {
    passed.push('✅ JWT installé')
  } else {
    issues.push('❌ jsonwebtoken manquant')
  }
}

// Résumé
console.log('\n' + '='.repeat(60))
console.log('📊 RÉSUMÉ DE LA VÉRIFICATION DE SÉCURITÉ')
console.log('='.repeat(60) + '\n')

if (passed.length > 0) {
  console.log('✅ TESTS RÉUSSIS (' + passed.length + '):')
  passed.forEach(p => console.log('   ' + p))
  console.log()
}

if (warnings.length > 0) {
  console.log('⚠️  AVERTISSEMENTS (' + warnings.length + '):')
  warnings.forEach(w => console.log('   ' + w))
  console.log()
}

if (issues.length > 0) {
  console.log('❌ PROBLÈMES CRITIQUES (' + issues.length + '):')
  issues.forEach(i => console.log('   ' + i))
  console.log()
}

// Score de sécurité
const total = passed.length + warnings.length + issues.length
const score = Math.round((passed.length / total) * 100)

console.log('='.repeat(60))
console.log(`🎯 SCORE DE SÉCURITÉ: ${score}%`)
console.log('='.repeat(60) + '\n')

if (issues.length > 0) {
  console.log('🚨 ACTION REQUISE: Corrigez les problèmes critiques avant le déploiement!')
  console.log('📖 Consultez URGENT_SECURITY_ACTIONS.md pour les instructions\n')
  process.exit(1)
} else if (warnings.length > 0) {
  console.log('⚠️  Améliorations recommandées disponibles')
  console.log('📖 Consultez SECURITY.md pour plus de détails\n')
  process.exit(0)
} else {
  console.log('✅ Toutes les vérifications de sécurité sont passées!')
  console.log('🚀 Vous pouvez déployer en toute sécurité\n')
  process.exit(0)
}
