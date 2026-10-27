<div align="center">

# Automation Exercise

Automação de testes E2E com Cypress — Trabalho de Conclusão de Curso.

![Cypress](https://img.shields.io/badge/Cypress-15.19.0-17202C?style=flat-square&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
[![GitHub Actions](https://github.com/mouracamilaluiza/automation-exercise/actions/workflows/e2e.yml/badge.svg)](https://github.com/mouracamilaluiza/automation-exercise/actions/workflows/e2e.yml)
[![Allure](https://img.shields.io/badge/Allure-Relat%C3%B3rio_online-2E7D32?style=flat-square)](https://mouracamilaluiza.github.io/automation-exercise/)

[**Ver relatório Allure**](https://mouracamilaluiza.github.io/automation-exercise/) · [Execuções no GitHub](https://github.com/mouracamilaluiza/automation-exercise/actions) · [Casos oficiais](https://automationexercise.com/test_cases)

</div>

## Cobertura

Dez cenários independentes, com seletores `data-qa`, ações reutilizáveis e criação/limpeza de contas por API.

| Casos | Funcionalidade |
| --- | --- |
| 1 e 5 | Cadastro e e-mail já existente |
| 2, 3 e 4 | Login válido, login inválido e logout |
| 8 e 9 | Listagem, detalhes e pesquisa de produtos |
| 10 | Inscrição no rodapé |
| 15 e 16 | Compra com cadastro ou login antes do checkout |

## Executar

**Requisitos:** Node.js 22 ou 24, npm e Google Chrome. Para gerar o Allure, Java 17+ no `PATH`.

```sh
npm ci
npm run test:chrome
```

| Comando | Uso |
| --- | --- |
| `npm test` | Testes no Electron |
| `npm run test:open` | Interface do Cypress |
| `npm run test:browserstack` | Execução no BrowserStack |

## Relatórios

Para gerar e abrir o Allure após os testes:

```sh
npm run allure:generate
npm run allure:open
```

O Mochawesome fica em `cypress/reports/index.html`. Vídeos e capturas de falha ficam em `cypress/videos/` e `cypress/screenshots/`.

## CI/CD

O GitHub Actions executa os testes em **pushes e pull requests**. Na branch `main`, publica o Allure no **GitHub Pages**. Relatórios e evidências ficam nos artefatos da execução por **14 dias**.

Para usar o BrowserStack, configure os secrets `BROWSERSTACK_USERNAME` e `BROWSERSTACK_ACCESS_KEY` e execute manualmente o workflow **BrowserStack Cypress**.

## Estrutura

```text
cypress/e2e/         # Casos de teste
cypress/pages/      # Ações e verificações da interface
cypress/support/    # Configuração e massa de dados
scripts/            # Utilitários do Allure
.github/workflows/  # Testes e publicação do relatório
```
