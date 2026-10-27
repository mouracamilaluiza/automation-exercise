const fs = require('node:fs');
const path = require('node:path');

const directory = path.resolve(__dirname, '..', 'allure-results');
const files = fs.existsSync(directory)
  ? fs.readdirSync(directory).filter((file) => file.endsWith('-result.json'))
  : [];
if (!files.length) {
  console.error('Nenhum resultado Allure encontrado. Execute a suíte antes de gerar/publicar o relatório.');
  process.exit(1);
}
for (const file of files) JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'));
console.log(`${files.length} resultado(s) Allure disponível(is).`);
