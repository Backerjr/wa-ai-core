import next from 'eslint-config-next'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  // Next.js recommended rules
  ...next(),
  // Disable rules that might conflict with Prettier
  eslintConfigPrettier,
]
