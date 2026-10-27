const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const envFile = path.join(root, '.env');
// Variáveis já definidas no terminal/Actions têm prioridade sobre o arquivo.
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

const required = ['BROWSERSTACK_USERNAME', 'BROWSERSTACK_ACCESS_KEY'];
const missing = required.filter((name) => !process.env[name]?.trim());
if (missing.length) {
  console.error(`Credenciais BrowserStack ausentes: ${missing.join(', ')}.`);
  console.error('Copie .env.example para .env e preencha os dois valores da sua conta.');
  console.error('Ou defina essas variáveis no terminal / secrets do GitHub Actions.');
  console.error('Obtenha as credenciais em https://www.browserstack.com/accounts/settings/product');
  process.exit(1);
}

const cli = require.resolve('browserstack-cypress-cli/bin/runner.js');
const result = spawnSync(process.execPath, [
  cli, 'run', '--sync', '--spec', 'cypress/e2e/automation-exercise-modules.cy.js',
  ...process.argv.slice(2),
], { cwd: root, env: process.env, stdio: 'inherit', shell: false });

if (result.error) {
  console.error(`Não foi possível iniciar o BrowserStack: ${result.error.message}`);
}
process.exit(result.status ?? 1);
