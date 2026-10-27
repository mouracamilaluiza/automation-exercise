const endpoints = [
  ["aplicação", "https://automationexercise.com/"],
  ["API de produtos", "https://automationexercise.com/api/productsList"],
];

async function check(name, url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
  console.log(`${name}: disponível (${response.status})`);
}

Promise.all(endpoints.map(([name, url]) => check(name, url))).catch((error) => {
  console.error(`Health check falhou: ${error.message}`);
  process.exit(1);
});
