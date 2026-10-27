const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
for (const directory of ['allure-results', 'allure-report']) {
  const target = path.resolve(root, directory);
  if (path.dirname(target) !== root) throw new Error('Diretório de limpeza fora do projeto');
  fs.rmSync(target, { recursive: true, force: true });
}
