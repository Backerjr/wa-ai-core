#!/usr/bin/env bash
set -euo pipefail

info() { printf '[INFO] %s\n' "$1"; }
warn() { printf '[WARN] %s\n' "$1"; }
ok()   { printf '[ OK ] %s\n' "$1"; }

info "Running WA AI Core diagnostics"

if [ ! -d "node_modules" ]; then
  info "node_modules missing – installing dependencies"
  npm install
else
  ok "Dependencies already installed"
fi

info "Building Tailwind CSS bundle"
npm run build:css

if [ -f "firebase-config.js" ]; then
  if grep -q "REPLACE_WITH_YOUR_API_KEY" firebase-config.js 2>/dev/null; then
    warn "firebase-config.js still contains template placeholders"
  elif grep -q "AIzaSyB8mZzYCujtcG5RylvCx18e6BRVp26kcFY" firebase-config.js 2>/dev/null; then
    warn "Default Firebase credentials detected – replace with your own before deploying"
  else
    ok "Custom Firebase credentials detected"
  fi
else
  warn "firebase-config.js is missing – copy firebase-config.template.js and add your credentials"
fi

if [ ! -f ".firebaserc" ] && [ -f ".firebaserc.template" ]; then
  info ".firebaserc missing – creating from template"
  cp .firebaserc.template .firebaserc
  warn "Update .firebaserc with your Firebase project ID before deploying"
elif [ -f ".firebaserc" ]; then
  ok ".firebaserc already present"
else
  warn "Neither .firebaserc nor template found – add your Firebase project configuration"
fi

if [ -f "dist/output.css" ] && [ -s "dist/output.css" ]; then
  ok "CSS build artifact dist/output.css exists"
else
  warn "dist/output.css missing or empty – rerun npm run build:css"
fi

if [ -f "firestore.rules" ]; then
  ok "Firestore rules file present"
else
  warn "firestore.rules missing – add rules before deployment"
fi

cat <<'EOF'

Next steps:
1. Ensure firebase-config.js has your real credentials.
2. Verify .firebaserc contains your Firebase project ID.
3. Deploy security rules with: firebase deploy --only firestore:rules
4. Open index.html and confirm anonymous auth succeeds.
EOF
